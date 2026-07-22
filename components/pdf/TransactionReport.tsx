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
        paddingBottom: 28,
        fontSize: 10,
        fontFamily: "Helvetica",
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

    summaryContainer: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 6,
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 12,
        marginBottom: 18,
      },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 4,
    },

    summaryLabel: {
        fontSize: 10,
        color: "#4B5563",
    },

    summaryValue: {
        fontSize: 10,
        fontWeight: "bold",
    },

    tableHeader: {
        flexDirection: "row",
        backgroundColor: "#F3F4F6",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#D1D5DB",
        paddingVertical: 7,
        paddingHorizontal: 6,
        fontSize: 9,
        fontWeight: "bold",
    },

    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#E5E7EB",
        paddingVertical: 6,
        paddingHorizontal: 6,
        fontSize: 9,
    },

    colDate: {
        width: "14%",
    },

    colProfile: {
        width: "16%",
    },

    colCategory: {
        width: "18%",
    },

    colDescription: {
        width: "34%",
        paddingRight: 8,
    },

    colAmount: {
        width: "18%",
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

export interface TransactionPdfItem {
    id: string;
    date: string;
    profile: string;
    category: string;
    description: string;
    type: "income" | "expense";
    amount: number;
}

interface Props {
    period: string;

    startingBalance: number;

    totalIncome: number;
    totalExpense: number;
    balance: number;

    transactionCount: number;

    transactions: TransactionPdfItem[];
}

export function TransactionReport({
    period,
    startingBalance,
    totalIncome,
    totalExpense,
    balance,
    transactionCount,
    transactions,
}: Props) {

    const currency = (value: number) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(value);

    const compactCurrency = (value: number) =>
        new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 0,
        }).format(value);

    const generatedAt = new Intl.DateTimeFormat(
        "id-ID",
        {
            dateStyle: "long",
            timeStyle: "short",
        }
    ).format(new Date());

    return (

        <Document
            title={`NOURA - Riwayat ${period}`}
            author="NOURA"
            subject="Riwayat Transaksi Bulanan"
            keywords="NOURA, Personal Finance, Laporan Keuangan"
        >
            <Page size="A4" style={styles.page}>
                <Text style={styles.logo}>
                    NOURA
                </Text>

                <Text style={styles.tagline}>
                    Financial Clarity System
                </Text>

                <Text style={styles.title}>
                    RIWAYAT TRANSAKSI
                </Text>

                <Text style={styles.subtitle}>
                    Periode {period}
                </Text>

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>
                    RINGKASAN
                </Text>

                <View style={styles.summaryContainer}>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Saldo Saat Mulai
                        </Text>

                        <Text style={styles.summaryValue}>
                            {currency(startingBalance)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Total Pemasukan
                        </Text>

                        <Text style={styles.summaryValue}>
                            {currency(totalIncome)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Total Pengeluaran
                        </Text>

                        <Text style={styles.summaryValue}>
                            {currency(totalExpense)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Saldo Saat Ini
                        </Text>

                        <Text style={styles.summaryValue}>
                            {currency(balance)}
                        </Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>
                            Jumlah Transaksi
                        </Text>

                        <Text style={styles.summaryValue}>
                            {transactionCount}
                        </Text>
                    </View>

                </View>

                <Text style={styles.sectionTitle}>
                    DETAIL TRANSAKSI
                </Text>

                <View
                    fixed
                    style={styles.tableHeader}
                >
                    <Text style={styles.colDate}>
                        Tanggal
                    </Text>

                    <Text style={styles.colProfile}>
                        Profil
                    </Text>

                    <Text style={styles.colCategory}>
                        Kategori
                    </Text>

                    <Text style={styles.colDescription}>
                        Keterangan
                    </Text>

                    <Text style={styles.colAmount}>
                        Nilai
                    </Text>
                </View>

                {transactions.map((item) => (
                    <View
                        key={item.id}
                        style={styles.tableRow}
                    >
                        <Text style={styles.colDate}>
                            {item.date}
                        </Text>

                        <Text style={styles.colProfile}>
                            {item.profile}
                        </Text>

                        <Text style={styles.colCategory}>
                            {item.category}
                        </Text>

                        <Text style={styles.colDescription}>
                            {item.description || "-"}
                        </Text>

                        <Text style={styles.colAmount}>
                            {item.type === "income"
                                ? "+"
                                : "-"}{" "}
                            {compactCurrency(item.amount)}
                        </Text>
                    </View>
                ))}

                <View
                    fixed
                    style={styles.footer}
                >
                    <Text>
                        Periode : {period}
                    </Text>

                    <Text>
                        Dibuat : {generatedAt}
                    </Text>

                    <Text>
                        Generated by NOURA
                    </Text>
                    <Text
                        render={({
                            pageNumber,
                            totalPages,
                        }) =>
                            `Halaman ${pageNumber} / ${totalPages}`
                        }
                    />
                </View>
            </Page>
        </Document>
    );
}