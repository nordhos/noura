import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        paddingTop: 36,
        paddingHorizontal: 36,
        paddingBottom: 30,
        fontFamily: "Helvetica",
        fontSize: 10,
        color: "#111827",
    },

    logo: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 2,
    },

    tagline: {
        fontSize: 10,
        color: "#6B7280",
        marginBottom: 18,
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 2,
    },

    subtitle: {
        fontSize: 11,
        color: "#6B7280",
        marginBottom: 14,
    },

    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        marginVertical: 14,
    },

    sectionTitle: {
        fontSize: 11,
        fontWeight: "bold",
        marginBottom: 10,
        letterSpacing: 0.4,
    },

    summaryBox: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 6,
        padding: 12,
        marginBottom: 18,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
        alignItems: "center",
    },

    label: {
        color: "#4B5563",
        fontSize: 10,
    },

    value: {
        fontWeight: "bold",
        fontSize: 10,
    },

    groupTitle: {
        marginTop: 10,
        marginBottom: 6,
        fontWeight: "bold",
        fontSize: 10,
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#F3F4F6",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#D1D5DB",
        paddingVertical: 7,
        paddingHorizontal: 6,
        fontWeight: "bold",
        fontSize: 9,
    },

    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#E5E7EB",
        paddingVertical: 6,
        paddingHorizontal: 6,
        fontSize: 9,
    },

    monthCol: {
        width: "24%",
    },

    incomeCol: {
        width: "26%",
        textAlign: "right",
    },

    expenseCol: {
        width: "26%",
        textAlign: "right",
    },

    balanceCol: {
        width: "24%",
        textAlign: "right",
    },

    footer: {
        marginTop: 24,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingTop: 10,
        fontSize: 8,
        color: "#6B7280",
        lineHeight: 1.6,
    },
});

export interface AnnualProfileSummary {
    profileId: string;
    name: string;
    amount: number;
}

export interface AnnualMonthlySummary {
    month: string;
    income: number;
    expense: number;
    balance: number;
}

interface Props {
    year: number;

    lifetimeBalance: number;

    annualBalance: number;

    totalIncome: number;

    totalExpense: number;

    incomeProfiles: AnnualProfileSummary[];

    expenseProfiles: AnnualProfileSummary[];

    monthly: AnnualMonthlySummary[];
}

export function AnnualReport({
    year,
    lifetimeBalance,
    annualBalance,
    totalIncome,
    totalExpense,
    incomeProfiles,
    expenseProfiles,
    monthly,
}: Props) {
    const currency = (value: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);

    const compact = (value: number) =>
        new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 0,
        }).format(value);

    const monthName = (month: string) => {
        const months = [
            "",
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        return months[Number(month)] ?? month;
    };

    const generatedAt = new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
    }).format(new Date());

    return (
        <Document
            title={`NOURA - Laporan ${year}`}
            author="NOURA"
            subject="Laporan Keuangan Tahunan"
        >
            <Page size="A4" style={styles.page}>
                <Text style={styles.logo}>NOURA</Text>

                <Text style={styles.tagline}>
                    Financial Clarity System
                </Text>

                <Text style={styles.title}>
                    LAPORAN KEUANGAN TAHUNAN
                </Text>

                <Text style={styles.subtitle}>
                    Tahun {year}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>
                    RINGKASAN
                </Text>

                <View style={styles.summaryBox}>
                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Saldo Berjalan (Lifetime)
                        </Text>

                        <Text style={styles.value}>
                            {currency(lifetimeBalance)}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Saldo Bersih Tahun {year}
                        </Text>

                        <Text style={styles.value}>
                            {currency(annualBalance)}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.groupTitle}>
                        PEMASUKAN
                    </Text>

                    {incomeProfiles.map((item) => (
                        <View
                            key={item.profileId}
                            style={styles.row}
                        >
                            <Text style={styles.label}>
                                {item.name}
                            </Text>

                            <Text>
                                {currency(item.amount)}
                            </Text>
                        </View>
                    ))}

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.value}>
                            Total Pemasukan
                        </Text>

                        <Text style={styles.value}>
                            {currency(totalIncome)}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.groupTitle}>
                        PENGELUARAN
                    </Text>

                    {expenseProfiles.map((item) => (
                        <View
                            key={item.profileId}
                            style={styles.row}
                        >
                            <Text style={styles.label}>
                                {item.name}
                            </Text>

                            <Text>
                                {currency(item.amount)}
                            </Text>
                        </View>
                    ))}

                    <View style={styles.divider} />

                    <View style={styles.row}>
                        <Text style={styles.value}>
                            Total Pengeluaran
                        </Text>

                        <Text style={styles.value}>
                            {currency(totalExpense)}
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionTitle}>
                    CASH FLOW BULANAN
                </Text>

                <View style={styles.tableHeader}>
                    <Text style={styles.monthCol}>
                        Bulan
                    </Text>

                    <Text style={styles.incomeCol}>
                        Masuk
                    </Text>

                    <Text style={styles.expenseCol}>
                        Keluar
                    </Text>

                    <Text style={styles.balanceCol}>
                        Saldo
                    </Text>
                </View>

                {monthly.map((item) => (
                    <View
                        key={monthName(item.month)}
                        style={styles.tableRow}
                    >
                        <Text style={styles.monthCol}>
                            {monthName(item.month)}
                        </Text>

                        <Text style={styles.incomeCol}>
                            + {compact(item.income)}
                        </Text>

                        <Text style={styles.expenseCol}>
                            - {compact(item.expense)}
                        </Text>

                        <Text style={styles.balanceCol}>
                            {compact(item.balance)}
                        </Text>
                    </View>
                ))}

                <View style={styles.footer} fixed>
                    <Text>
                        Tahun : {year}
                    </Text>

                    <Text>
                        Dibuat : {generatedAt}
                    </Text>

                    <Text>
                        Generated by NOURA
                    </Text>

                    <Text
                        render={({ pageNumber, totalPages }) =>
                            `Halaman ${pageNumber} / ${totalPages}`
                        }
                    />
                </View>
            </Page>
        </Document>
    );
}