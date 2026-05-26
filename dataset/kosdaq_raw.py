from krx_common import collect_period_to_csv


API_URL = "https://data-dbg.krx.co.kr/svc/apis/idx/kosdaq_dd_trd"

COLUMN_MAP = {
    "BAS_DD": "date",
    "IDX_CLSS": "index_class",
    "IDX_NM": "index_name",
    "CLSPRC_IDX": "close",
    "CMPPREVDD_IDX": "change",
    "FLUC_RT": "change_rate",
    "OPNPRC_IDX": "open",
    "HGPRC_IDX": "high",
    "LWPRC_IDX": "low",
    "ACC_TRDVOL": "volume",
    "ACC_TRDVAL": "trading_value",
    "MKTCAP": "market_cap"
}

NUMERIC_COLS = [
    "close",
    "change",
    "change_rate",
    "open",
    "high",
    "low",
    "volume",
    "trading_value",
    "market_cap"
]

PREFERRED_COLS = [
    "date",
    "index_class",
    "index_name",
    "open",
    "high",
    "low",
    "close",
    "change",
    "change_rate",
    "volume",
    "trading_value",
    "market_cap"
]

SORT_COLS = ["index_name", "date"]


if __name__ == "__main__":
    collect_period_to_csv(
        api_url=API_URL,
        start_date="20260101",
        end_date="20260430",
        output_filename="kosdaq_index_4m_2601.csv",
        column_map=COLUMN_MAP,
        numeric_cols=NUMERIC_COLS,
        preferred_cols=PREFERRED_COLS,
        sort_cols=SORT_COLS
    )