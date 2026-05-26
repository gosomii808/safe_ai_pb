from krx_common import collect_period_to_csv


API_URL = "https://data-dbg.krx.co.kr/svc/apis/idx/bon_dd_trd"

COLUMN_MAP = {
    "BAS_DD": "date",
    "BND_IDX_GRP_NM": "bond_index_name",

    "TOT_EARNG_IDX": "total_return_index_close",
    "TOT_EARNG_IDX_CMPPREVDD": "total_return_index_change",

    "NETPRC_IDX": "net_price_index_close",
    "NETPRC_IDX_CMPPREVDD": "net_price_index_change",

    "ZERO_REINVST_IDX": "zero_reinvestment_index_close",
    "ZERO_REINVST_IDX_CMPPREVDD": "zero_reinvestment_index_change",

    "CALL_REINVST_IDX": "call_reinvestment_index_close",
    "CALL_REINVST_IDX_CMPPREVDD": "call_reinvestment_index_change",

    "MKT_PRC_IDX": "market_price_index_close",
    "MKT_PRC_IDX_CMPPREVDD": "market_price_index_change",

    "AVG_DURATION": "avg_duration",
    "AVG_CONVEXITY_PRC": "avg_convexity_price",
    "BND_IDX_AVG_YD": "ytm"
}

NUMERIC_COLS = [
    "total_return_index_close",
    "total_return_index_change",
    "net_price_index_close",
    "net_price_index_change",
    "zero_reinvestment_index_close",
    "zero_reinvestment_index_change",
    "call_reinvestment_index_close",
    "call_reinvestment_index_change",
    "market_price_index_close",
    "market_price_index_change",
    "avg_duration",
    "avg_convexity_price",
    "ytm"
]

PREFERRED_COLS = [
    "date",
    "bond_index_name",
    "total_return_index_close",
    "total_return_index_change",
    "net_price_index_close",
    "net_price_index_change",
    "zero_reinvestment_index_close",
    "zero_reinvestment_index_change",
    "call_reinvestment_index_close",
    "call_reinvestment_index_change",
    "market_price_index_close",
    "market_price_index_change",
    "avg_duration",
    "avg_convexity_price",
    "ytm"
]

SORT_COLS = ["bond_index_name", "date"]


if __name__ == "__main__":
    collect_period_to_csv(
        api_url=API_URL,
        start_date="20260101",
        end_date="20260430",
        output_filename="bond_index_4m_2601.csv",
        column_map=COLUMN_MAP,
        numeric_cols=NUMERIC_COLS,
        preferred_cols=PREFERRED_COLS,
        sort_cols=SORT_COLS
    )