"use client"

import { useState } from "react"
import { PortfolioAssetInput } from "@/lib/onboarding-types"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, ShieldAlert, LineChart, BadgeCent } from "lucide-react"

interface PortfolioInputStepProps {
  data: PortfolioAssetInput[];
  onNext: (data: PortfolioAssetInput[]) => void;
  onBack: () => void;
}

export function PortfolioInputStep({ data, onNext, onBack }: PortfolioInputStepProps) {
  const [assets, setAssets] = useState<PortfolioAssetInput[]>(
    data.length > 0
      ? data
      : [
          {
            market: "KOSPI",
            ticker: "",
            stockName: "",
            sector: "",
            quantity: 0,
            avgBuyPrice: 0,
            investmentAmount: 0,
            targetRatio: 0,
          },
        ]
  );

  const [errors, setErrors] = useState<Record<number, Partial<Record<keyof PortfolioAssetInput, string>>>>({});
  const [generalError, setGeneralError] = useState<string>("");

  const handleAddAsset = () => {
    setAssets(prev => [
      ...prev,
      {
        market: "KOSPI",
        ticker: "",
        stockName: "",
        sector: "",
        quantity: 0,
        avgBuyPrice: 0,
        investmentAmount: 0,
        targetRatio: 0,
      },
    ]);
    setGeneralError("");
  };

  const handleRemoveAsset = (index: number) => {
    if (assets.length === 1) {
      setGeneralError("최소 1개 이상의 포트폴리오 종목을 입력해야 합니다.");
      return;
    }
    setAssets(prev => prev.filter((_, i) => i !== index));
    // Clear errors for deleted asset and shift other errors
    setErrors(prev => {
      const nextErrors: typeof prev = {};
      Object.keys(prev).forEach((keyStr) => {
        const key = Number(keyStr);
        if (key < index) {
          nextErrors[key] = prev[key];
        } else if (key > index) {
          nextErrors[key - 1] = prev[key];
        }
      });
      return nextErrors;
    });
  };

  const handleFieldChange = (index: number, key: keyof PortfolioAssetInput, value: any) => {
    setAssets(prev => {
      const updated = [...prev];
      const target = { ...updated[index], [key]: value };

      // Auto calculate investment amount when quantity or avgBuyPrice change
      if (key === "quantity" || key === "avgBuyPrice") {
        const qty = key === "quantity" ? Number(value) : Number(target.quantity);
        const price = key === "avgBuyPrice" ? Number(value) : Number(target.avgBuyPrice);
        target.investmentAmount = qty * price;
      }

      updated[index] = target;
      return updated;
    });

    // Clear specific field error
    if (errors[index]?.[key]) {
      setErrors(prev => ({
        ...prev,
        [index]: {
          ...prev[index],
          [key]: "",
        },
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (assets.length === 0) {
      setGeneralError("최소 1개 이상의 포트폴리오 종목을 입력해야 합니다.");
      return false;
    }

    assets.forEach((asset, index) => {
      const itemErrors: Partial<Record<keyof PortfolioAssetInput, string>> = {};

      if (!asset.ticker.trim()) {
        itemErrors.ticker = "코드 필수";
        isValid = false;
      }
      if (!asset.stockName.trim()) {
        itemErrors.stockName = "종목명 필수";
        isValid = false;
      }
      if (!asset.sector.trim()) {
        itemErrors.sector = "업종 필수";
        isValid = false;
      }
      if (asset.quantity <= 0) {
        itemErrors.quantity = "0 초과";
        isValid = false;
      }
      if (asset.avgBuyPrice <= 0) {
        itemErrors.avgBuyPrice = "0 초과";
        isValid = false;
      }
      if (asset.investmentAmount < 0) {
        itemErrors.investmentAmount = "0 이상";
        isValid = false;
      }
      if (asset.targetRatio < 0 || asset.targetRatio > 100) {
        itemErrors.targetRatio = "0~100%";
        isValid = false;
      }

      if (Object.keys(itemErrors).length > 0) {
        newErrors[index] = itemErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext(assets);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Portfolio Info Alert */}
      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-4 flex gap-3">
        <ShieldAlert className="h-5 w-5 shrink-0 text-primary mt-0.5" />
        <div className="text-xs text-muted-foreground leading-relaxed">
          <p className="font-semibold text-primary mb-1">자산 정보 보안 안내</p>
          <p>
            보유 수량, 평균 매수가, 투자 금액은 자산 규모와 투자 전략을 추론할 수 있는 핵심 민감정보입니다. 
            해당 수치는 <span className="text-foreground font-medium">데이터 전송 및 저장 시 즉시 암호화 처리</span>되며, 
            AI 분석 시에는 비중, 리스크 등급 등의 통계 지표로 가공(비식별화)된 형태로만 처리되어 안전합니다.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
            <LineChart className="h-4 w-4 text-muted-foreground" />
            보유 종목 구성
          </label>
          <span className="text-xs text-muted-foreground">
            입력된 수량 × 매수가로 투자 금액이 자동 환산됩니다.
          </span>
        </div>

        {generalError && (
          <p className="text-sm text-red-400 font-medium bg-red-400/10 p-3 rounded-xl">
            {generalError}
          </p>
        )}

        <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
          {assets.map((asset, index) => (
            <div
              key={index}
              className="glass-card p-4 rounded-xl border border-border relative flex flex-col gap-3 group"
            >
              {/* Row Header & Delete */}
              <div className="flex items-center justify-between border-b border-border/50 pb-2">
                <span className="text-xs font-semibold text-primary"># {index + 1}번째 종목</span>
                <button
                  type="button"
                  onClick={() => handleRemoveAsset(index)}
                  className="text-muted-foreground hover:text-red-400 p-1 rounded-lg hover:bg-red-400/10 transition-colors"
                  title="종목 삭제"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Grid 1: Basic Info */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {/* Market */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">시장</label>
                  <select
                    value={asset.market}
                    onChange={(e) => handleFieldChange(index, "market", e.target.value)}
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-2 text-xs text-foreground focus:outline-none"
                  >
                    <option value="KOSPI">KOSPI</option>
                    <option value="KOSDAQ">KOSDAQ</option>
                    <option value="NASDAQ">NASDAQ</option>
                    <option value="NYSE">NYSE</option>
                    <option value="ETF">ETF</option>
                  </select>
                </div>

                {/* Ticker */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">종목코드</label>
                  <input
                    type="text"
                    value={asset.ticker}
                    onChange={(e) => handleFieldChange(index, "ticker", e.target.value.toUpperCase())}
                    placeholder="예: 005930"
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                  {errors[index]?.ticker && (
                    <p className="text-[10px] text-red-400 font-semibold">{errors[index].ticker}</p>
                  )}
                </div>

                {/* Stock Name */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">종목명</label>
                  <input
                    type="text"
                    value={asset.stockName}
                    onChange={(e) => handleFieldChange(index, "stockName", e.target.value)}
                    placeholder="예: 삼성전자"
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                  {errors[index]?.stockName && (
                    <p className="text-[10px] text-red-400 font-semibold">{errors[index].stockName}</p>
                  )}
                </div>

                {/* Sector */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">업종/섹터</label>
                  <input
                    type="text"
                    value={asset.sector}
                    onChange={(e) => handleFieldChange(index, "sector", e.target.value)}
                    placeholder="예: 반도체"
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                  {errors[index]?.sector && (
                    <p className="text-[10px] text-red-400 font-semibold">{errors[index].sector}</p>
                  )}
                </div>
              </div>

              {/* Grid 2: Quantity & Prices */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {/* Quantity */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">수량 (주)</label>
                  <input
                    type="number"
                    min="0.001"
                    step="any"
                    value={asset.quantity || ""}
                    onChange={(e) => handleFieldChange(index, "quantity", e.target.value === "" ? 0 : Number(e.target.value))}
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                  {errors[index]?.quantity && (
                    <p className="text-[10px] text-red-400 font-semibold">{errors[index].quantity}</p>
                  )}
                </div>

                {/* Avg Buy Price */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">평균 매수가 (원/$)</label>
                  <input
                    type="number"
                    min="1"
                    value={asset.avgBuyPrice || ""}
                    onChange={(e) => handleFieldChange(index, "avgBuyPrice", e.target.value === "" ? 0 : Number(e.target.value))}
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:outline-none focus:border-primary"
                  />
                  {errors[index]?.avgBuyPrice && (
                    <p className="text-[10px] text-red-400 font-semibold">{errors[index].avgBuyPrice}</p>
                  )}
                </div>

                {/* Investment Amount (Calculated) */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                    <BadgeCent className="h-3 w-3 text-muted-foreground" />
                    투자 금액 (원/$)
                  </label>
                  <input
                    type="number"
                    value={asset.investmentAmount || ""}
                    onChange={(e) => handleFieldChange(index, "investmentAmount", e.target.value === "" ? 0 : Number(e.target.value))}
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground/80 focus:outline-none"
                    readOnly
                  />
                </div>

                {/* Target Ratio */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-muted-foreground">목표 비중 (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={asset.targetRatio || ""}
                    onChange={(e) => handleFieldChange(index, "targetRatio", e.target.value === "" ? 0 : Number(e.target.value))}
                    className="h-9 w-full rounded-lg border border-border bg-muted/30 px-3 text-xs text-foreground focus:outline-none focus:border-primary"
                    placeholder="예: 30"
                  />
                  {errors[index]?.targetRatio && (
                    <p className="text-[10px] text-red-400 font-semibold">{errors[index].targetRatio}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={handleAddAsset}
          className="w-full h-11 rounded-xl border border-dashed border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/10 transition-all text-xs font-semibold text-primary flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          보유 종목 추가하기
        </button>
      </div>

      <div className="pt-4 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-11 px-8 rounded-xl border-border hover:bg-muted text-foreground"
        >
          이전 단계
        </Button>
        <Button type="submit" className="h-11 px-8 rounded-xl font-medium">
          다음 단계
        </Button>
      </div>
    </form>
  );
}
