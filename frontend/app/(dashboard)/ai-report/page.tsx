"use client";

// frontend/app/(dashboard)/ai-report/page.tsx
//
// 기존 디자인(스크린샷)을 유지하되, 더미 상수를 제거하고 API 응답으로 렌더링합니다.
// - 더미 reportCards / productRecommendations / 78점 / A,A-,B+,B 고정값 전부 제거됨
// - loading / no-userId / insufficient_data / error / ready 상태 처리
// - 아이콘/색상은 프론트에서 card.id / status 기준 매핑

import { useEffect, useState } from "react";
import {
  Sparkles,
  Shield,
  BarChart3,
  TrendingUp,
  PieChart,
  AlertTriangle,
  Target,
  Lightbulb,
  ChevronRight,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { getLatestAiReport, getPortfolioAssets, getEventStudy, type EventStudyItem } from "@/lib/api";
import type {
  AiReportResponse,
  AiReportCard,
  AiReportCardStatus,
  AiReportRisk,
} from "@/lib/ai-report-types";


// ── 매핑 ───────────────────────────────────────────────

const cardIcons: Record<string, LucideIcon> = {
  risk: Shield,
  macro: BarChart3,
  volatility: TrendingUp,
  diversification: PieChart,
};

// 카드 헤더 아이콘 박스 톤
const cardIconTone: Record<AiReportCardStatus, string> = {
  positive: "bg-green-500/15 text-green-400",
  warning: "bg-yellow-500/15 text-yellow-400",
  neutral: "bg-blue-500/15 text-blue-400",
  danger: "bg-red-500/15 text-red-400",
};

// 카드 상태 라벨
const statusLabel: Record<AiReportCardStatus, string> = {
  positive: "양호",
  warning: "주의 필요",
  neutral: "보통",
  danger: "위험",
};

const statusTextTone: Record<AiReportCardStatus, string> = {
  positive: "text-green-400",
  warning: "text-yellow-400",
  neutral: "text-blue-400",
  danger: "text-red-400",
};

// 등급 색상 (요약 카드)
function gradeColor(grade: string | null): string {
  if (!grade) return "text-gray-500";
  if (grade.startsWith("A")) return "text-green-400";
  if (grade.startsWith("B")) return grade === "B+" ? "text-yellow-400" : "text-blue-400";
  if (grade.startsWith("C")) return "text-yellow-400";
  return "text-red-400";
}

// 상품 위험도 배지
const riskBadge: Record<AiReportRisk, { label: string; cls: string }> = {
  low: { label: "위험도 낮음", cls: "bg-green-500/20 text-green-400" },
  medium: { label: "위험도 중간", cls: "bg-yellow-500/20 text-yellow-400" },
  high: { label: "위험도 높음", cls: "bg-red-500/20 text-red-400" },
};

// ── userId 헬퍼 ──────────────────────────────────────────
// 온보딩 성공 후 localStorage("safe_pb_user_id")에 저장된 값을 사용합니다.
// TODO(auth): 세션 도입 시 제거.
function useUserId(): string | null {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(window.localStorage.getItem("safe_pb_user_id"));
    }
  }, []);
  return userId;
}

// ── 페이지 ───────────────────────────────────────────────

export default function AiReportPage() {
  const userId = useUserId();
  const [userIdResolved, setUserIdResolved] = useState(false);
  const [report, setReport] = useState<AiReportResponse | null>(null);
  const [rawAssets, setRawAssets] = useState<any[]>([]);
  const [eventStudy, setEventStudy] = useState<EventStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // useUserId가 마운트 후 1회 setState → 그 시점 이후를 resolved로 본다
    if (typeof window !== "undefined") setUserIdResolved(true);
  }, []);

  useEffect(() => {
    if (!userIdResolved) return;
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    Promise.all([
      getLatestAiReport(userId),
      getPortfolioAssets(userId).catch(() => []),
      getEventStudy(userId).catch(() => [])
    ])
      .then(([reportRes, assetsRes, studyRes]) => {
        if (!cancelled) {
          setReport(reportRes);
          setRawAssets(assetsRes);
          setEventStudy(studyRes);
        }
      })
      .catch((e: Error) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, userIdResolved]);


  // ── 상태별 렌더 ──

  if (loading) {
    return (
      <PageShell>
        <CenteredNotice
          icon={<Loader2 className="h-6 w-6 animate-spin text-green-400" />}
          title="AI 리포트를 불러오는 중입니다."
          desc="포트폴리오를 분석하고 있습니다. 잠시만 기다려 주세요."
        />
      </PageShell>
    );
  }

  if (!userId) {
    return (
      <PageShell>
        <CenteredNotice
          icon={<AlertTriangle className="h-6 w-6 text-yellow-400" />}
          title="사용자 정보가 없어 리포트를 생성할 수 없습니다."
          desc="온보딩을 먼저 완료해 주세요."
        />
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell>
        <CenteredNotice
          icon={<AlertTriangle className="h-6 w-6 text-red-400" />}
          title="리포트를 불러오지 못했습니다."
          desc={error}
        />
      </PageShell>
    );
  }

  if (!report) return null;

  const { summary, cards, productRecommendations, dataQuality, status } = report;
  const isInsufficient = status === "insufficient_data";

  return (
    <PageShell badge={status === "ready" ? "AI 분석 완료" : "데이터 부족"}>
      {/* 종합 진단 카드 */}
      <section className="rounded-2xl border border-white/5 bg-[#161b22] p-6">
        <div className="flex items-center gap-2 text-green-400">
          <Sparkles className="h-5 w-5" />
          <span className="font-semibold">AI 종합 진단</span>
        </div>

        <h2 className="mt-3 text-3xl font-bold text-white">
          {summary.totalScore != null ? (
            <>
              포트폴리오 종합 점수:{" "}
              <span className="text-green-400">{summary.totalScore}점</span>
            </>
          ) : (
            summary.headline
          )}
        </h2>

        <p className="mt-3 max-w-3xl leading-relaxed text-gray-400">
          {summary.description}
        </p>

        {/* 등급 그리드 */}
        {summary.totalScore != null && (
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/5 bg-white/5 md:grid-cols-4">
            <GradeCell label="위험관리" grade={summary.grades.riskManagement} />
            <GradeCell label="수익성" grade={summary.grades.profitability} />
            <GradeCell label="분산도" grade={summary.grades.diversification} />
            <GradeCell label="유동성" grade={summary.grades.liquidity} />
          </div>
        )}

        {isInsufficient && dataQuality.missing.length > 0 && (
          <p className="mt-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
            데이터 부족: {dataQuality.missing.join(", ")}
          </p>
        )}
      </section>

      {/* 보유 주수 확인 (민감 정보 정책에 따라 사용자 본인 화면에서만 제한적으로 노출) */}
      {rawAssets.length > 0 && (
        <section className="mt-6 rounded-2xl border border-white/5 bg-[#161b22] p-5">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer list-none select-none">
              <div className="flex items-center gap-2 text-green-400">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="font-semibold text-sm">보안인증 보유 주수 확인 (민감정보 보호)</span>
              </div>
              <span className="text-xs text-gray-400 group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <div className="mt-4 border-t border-white/5 pt-3">
              <p className="text-xs text-gray-400 mb-3 leading-normal">
                민감 정보 보안 정책에 따라 외부 AI 엔진과의 API 통신 시에는 상세 보유 주수가 노출되지 않으며, 오직 본인 인증된 현재 대시보드 화면에서만 안전하게 표시됩니다.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {rawAssets.map((asset) => (
                  <div key={`${asset.market}-${asset.ticker}`} className="bg-black/20 rounded-xl p-3 border border-white/5">
                    <p className="text-xs font-semibold text-white truncate">{asset.stockName || asset.ticker}</p>
                    <p className="text-[10px] text-gray-500 mt-0.5">{asset.ticker} · {asset.market}</p>
                    <p className="text-sm font-bold text-green-400 mt-2">{asset.quantity.toLocaleString("ko-KR")} 주</p>
                  </div>
                ))}
              </div>
            </div>
          </details>
        </section>
      )}

      {/* 단기 흐름 분석 카드 */}
      {report.trendAnalysis && (
        <section className="mt-6 rounded-2xl border border-white/5 bg-[#161b22] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              <h3 className="text-xl font-bold text-white">단기 흐름 분석</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                report.trendAnalysis.trendSignal === "positive" 
                  ? "bg-green-500/20 text-green-400" 
                  : report.trendAnalysis.trendSignal === "negative"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-blue-500/20 text-blue-400"
              }`}>
                {report.trendAnalysis.trendSignal === "positive" ? "상승 우위" : report.trendAnalysis.trendSignal === "negative" ? "조정 우위" : "횡보/중립"}
              </span>
              <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                report.trendAnalysis.riskLevel === "high"
                  ? "bg-red-500/20 text-red-400"
                  : report.trendAnalysis.riskLevel === "medium"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
              }`}>
                리스크: {report.trendAnalysis.riskLevel === "high" ? "높음" : report.trendAnalysis.riskLevel === "medium" ? "보통" : "낮음"}
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center justify-center bg-black/25 rounded-2xl p-6 min-w-[120px]">
              <span className="text-sm text-gray-400">단기 흐름 점수</span>
              <span className="text-4xl font-extrabold text-green-400 mt-2">{report.trendAnalysis.trendScore}점</span>
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed text-gray-300">
                {report.trendAnalysis.summary}
              </p>
              
              {report.trendAnalysis.keyDrivers.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">핵심 단기 모멘텀 요인</p>
                  <ul className="space-y-1.5">
                    {report.trendAnalysis.keyDrivers.map((driver, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                        {driver}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 경제 이벤트 영향 분석 (Event Study) 카드 추가 */}
      {eventStudy && eventStudy.length > 0 && (
        <section className="mt-6 rounded-2xl border border-white/5 bg-[#161b22] p-6">
          <div className="flex items-center gap-2 text-green-400">
            <BarChart3 className="h-5 w-5" />
            <h3 className="text-xl font-bold text-white">경제 이벤트 영향 분석 (Event Study)</h3>
          </div>
          <p className="mt-1 text-sm text-gray-400 leading-relaxed">
            기준금리 결정 이벤트 전후[-3일, +7일]의 시장 지수 대비 포트폴리오의 실질 초과수익률(Abnormal Return) 흐름을 역사적 데이터로 분석합니다.
          </p>

          <div className="mt-5 space-y-4">
            {eventStudy.map((study, idx) => (
              <div key={idx} className="rounded-xl border border-white/5 bg-black/20 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-white">{study.eventTitle}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">이벤트 발생일: {study.eventDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-white/5 px-2 py-1 text-xs text-gray-300">
                      유형: {study.decisionType === "cut" ? "인하" : study.decisionType === "hike" ? "인상" : "동결"} ({study.changeBp}bp)
                    </span>
                    <span className={`rounded px-2.5 py-1 text-xs font-bold ${
                      study.cumulativeAbnormalReturn >= 0 
                        ? "bg-green-500/20 text-green-400" 
                        : "bg-red-500/20 text-red-400"
                    }`}>
                      누적 초과수익률: {study.cumulativeAbnormalReturn >= 0 ? "+" : ""}{study.cumulativeAbnormalReturn}%
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <div className="bg-black/10 rounded-lg p-3 text-center border border-white/5">
                    <span className="text-[10px] text-gray-400">포트폴리오 수익률</span>
                    <p className="text-sm font-semibold text-white mt-1">{study.portfolioReturn}%</p>
                  </div>
                  <div className="bg-black/10 rounded-lg p-3 text-center border border-white/5">
                    <span className="text-[10px] text-gray-400">시장 지수 수익률</span>
                    <p className="text-sm font-semibold text-white mt-1">{study.marketReturn}%</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 bg-black/10 rounded-lg p-3 text-center border border-white/5 flex flex-col justify-center">
                    <span className="text-[10px] text-gray-400">abnormalReturn</span>
                    <p className={`text-sm font-bold mt-1 ${study.cumulativeAbnormalReturn >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {study.cumulativeAbnormalReturn >= 0 ? "+" : ""}{study.cumulativeAbnormalReturn}%
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-gray-300 bg-white/5 rounded-lg px-3 py-2 leading-relaxed">
                  {study.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 분석 카드 2열 그리드 */}

      {cards.length > 0 && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <AnalysisCard key={card.id} card={card} />
          ))}
        </div>
      )}

      {/* 추천 투자상품 유형 */}
      {productRecommendations.length > 0 && (
        <section className="mt-6 rounded-2xl border border-white/5 bg-[#161b22] p-6">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-400" />
            <h3 className="text-xl font-bold text-white">추천 투자상품 유형</h3>
          </div>
          <p className="mt-1 text-sm text-gray-400">
            투자 성향과 현재 포트폴리오를 기반으로 추천드리는 상품 카테고리입니다
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {productRecommendations.map((p) => {
              const badge = riskBadge[p.risk];
              return (
                <div
                  key={p.category}
                  className="rounded-xl border border-white/5 bg-black/20 p-5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-white">{p.category}</h4>
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-semibold ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.examples.map((ex) => (
                      <span
                        key={ex}
                        className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-300"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-sm font-medium text-green-400">
                    {p.suitability}
                  </p>
                </div>
              );
            })}
          </div>

          {/* disclaimer */}
          <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <p className="text-sm leading-relaxed text-red-300">
              <span className="font-bold">중요:</span> {report.disclaimer}
            </p>
          </div>
        </section>
      )}
    </PageShell>
  );
}

// ── 하위 컴포넌트 ─────────────────────────────────────────

function PageShell({
  children,
  badge,
}: {
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl px-2 py-2">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">AI 리포트</h1>
          <p className="mt-1 text-gray-400">AI가 분석한 맞춤형 투자 인사이트</p>
        </div>
        {badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/15 px-3 py-1.5 text-sm font-medium text-green-400">
            <Sparkles className="h-4 w-4" />
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function CenteredNotice({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#161b22] p-10 text-center">
      <div className="mb-3">{icon}</div>
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 max-w-md text-sm text-gray-400">{desc}</p>
    </div>
  );
}

function GradeCell({
  label,
  grade,
}: {
  label: string;
  grade: string | null;
}) {
  return (
    <div className="bg-[#161b22] px-4 py-6 text-center">
      <div className={`text-3xl font-bold ${gradeColor(grade)}`}>
        {grade ?? "—"}
      </div>
      <div className="mt-1 text-sm text-gray-400">{label}</div>
    </div>
  );
}

function AnalysisCard({ card }: { card: AiReportCard }) {
  const Icon = cardIcons[card.id] ?? BarChart3;
  return (
    <section className="rounded-2xl border border-white/5 bg-[#161b22] p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${cardIconTone[card.status]}`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{card.title}</h3>
            <span className={`text-sm font-medium ${statusTextTone[card.status]}`}>
              {statusLabel[card.status]}
            </span>
          </div>
        </div>
        {(card.status === "warning" || card.status === "danger") && (
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        )}
      </div>

      <p className="mt-4 font-semibold text-white">{card.summary}</p>

      <ul className="mt-3 space-y-2">
        {card.details.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
            <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
            <span>{d}</span>
          </li>
        ))}
      </ul>

      {card.recommendation && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-green-500/10 px-4 py-3">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
          <p className="text-sm text-green-300">{card.recommendation}</p>
        </div>
      )}
    </section>
  );
}
