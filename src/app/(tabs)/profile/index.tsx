import { DISCOVER_PODCASTS } from "@/constants/dummy/home/podcasts";
import { SfProFont, useSfProFont } from "@/hooks/useSfProFont";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import type {
  ComponentProps,
  FC,
  FunctionComponent,
  JSX,
  ReactElement,
  ReactNode,
} from "react";
import React, { Fragment } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const isIOS = Platform.OS === "ios";

interface IRow {
  id: string;
  label: string;
  sfSymbol: ComponentProps<typeof SymbolView>["name"];
  ionicon: ComponentProps<typeof Ionicons>["name"];
  value?: string;
  badge?: string;
}

const PERSONALIZE_ROWS: IRow[] = [
  {
    id: "personal_details",
    label: "Personal Details",
    sfSymbol: "person.crop.circle.fill",
    ionicon: "person-circle",
  },
  {
    id: "listening_preferences",
    label: "Listening Preferences",
    sfSymbol: "slider.horizontal.3",
    ionicon: "options",
  },
  {
    id: "appearance",
    label: "Appearance",
    sfSymbol: "moon.fill",
    ionicon: "moon",
    value: "Dark",
  },
  {
    id: "notifications",
    label: "Notifications",
    sfSymbol: "bell.fill",
    ionicon: "notifications",
  },
];

const HELP_ROWS: IRow[] = [
  {
    id: "tips",
    label: "Tips and Tricks",
    sfSymbol: "sparkles",
    ionicon: "sparkles",
  },
  {
    id: "faq",
    label: "Frequently Asked Questions",
    sfSymbol: "questionmark.circle.fill",
    ionicon: "help-circle",
  },
  {
    id: "contact",
    label: "Contact Us",
    sfSymbol: "envelope.fill",
    ionicon: "mail",
  },
];

const MEMBERSHIP_ROWS: IRow[] = [
  {
    id: "subscription",
    label: "Subscription",
    sfSymbol: "crown.fill",
    ionicon: "ribbon",
    badge: "Pro",
  },
  {
    id: "billing",
    label: "Billing & Plans",
    sfSymbol: "creditcard.fill",
    ionicon: "card",
  },
];

const FAVORITE_BOOKS = DISCOVER_PODCASTS.slice(0, 4);

const ProfileScreen: FC & FunctionComponent = ():
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  const { loaded } = useSfProFont();
  const fontMedium = loaded ? SfProFont.medium : undefined;
  const fontBold = loaded ? SfProFont.bold : undefined;
  const fontRegular = loaded ? SfProFont.regular : undefined;

  return (
    <Fragment>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLargeTitleEnabled: true,
          title: "Profile",
          headerLargeTitleStyle: {
            fontFamily: fontBold,
          },
          headerTitleStyle: {
            fontFamily: fontMedium,
          },
          headerSearchBarOptions:
            isIOS ?
              {
                placeholder: "Search settings",
                placement: "stacked",
              }
            : undefined,
        }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scroll}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        {!isIOS ?
          <View style={styles.searchFieldWrap}>
            <View style={styles.searchField}>
              <Ionicons name="search" size={16} color="#8e8e93" />
              <Text
                style={[styles.searchPlaceholder, { fontFamily: fontMedium }]}
              >
                Search settings
              </Text>
            </View>
          </View>
        : null}

        <SectionHeader title="Favorite Books" fontFamily={fontMedium} />
        <Card>
          <Pressable
            style={({ pressed }) => [
              styles.favoriteWrap,
              { backgroundColor: pressed ? "#2a2a2c" : "transparent" },
            ]}
          >
            <View style={styles.favoriteHeader}>
              <View style={styles.favoriteHeaderLeft}>
                <Text style={[styles.favoriteTitle, { fontFamily: fontBold }]}>
                  Your favorites
                </Text>
                <Text
                  style={[styles.favoriteSubtitle, { fontFamily: fontMedium }]}
                >
                  {FAVORITE_BOOKS.length} saved · tap to view all
                </Text>
              </View>
              <Chevron />
            </View>
            <View style={styles.favoriteRow}>
              {FAVORITE_BOOKS.map((b, i) => (
                <View
                  key={b.id}
                  style={[
                    styles.favoriteCover,
                    { marginLeft: i === 0 ? 0 : -12, zIndex: 10 - i },
                  ]}
                >
                  <Image
                    source={{ uri: b.artwork }}
                    style={styles.favoriteCoverImg}
                  />
                </View>
              ))}
            </View>
          </Pressable>
        </Card>

        <SectionHeader title="Personalize" fontFamily={fontMedium} />
        <Card>
          {PERSONALIZE_ROWS.map((r, idx) => (
            <Row
              key={r.id}
              row={r}
              isLast={idx === PERSONALIZE_ROWS.length - 1}
              fontMedium={fontMedium}
              fontRegular={fontRegular}
            />
          ))}
        </Card>

        <SectionHeader title="Need Help?" fontFamily={fontMedium} />
        <Card>
          {HELP_ROWS.map((r, idx) => (
            <Row
              key={r.id}
              row={r}
              isLast={idx === HELP_ROWS.length - 1}
              fontMedium={fontMedium}
              fontRegular={fontRegular}
            />
          ))}
        </Card>

        <SectionHeader title="Membership" fontFamily={fontMedium} />
        <Card>
          {MEMBERSHIP_ROWS.map((r, idx) => (
            <Row
              key={r.id}
              row={r}
              isLast={idx === MEMBERSHIP_ROWS.length - 1}
              fontMedium={fontMedium}
              fontBold={fontBold}
              fontRegular={fontRegular}
            />
          ))}
        </Card>

        <View style={styles.signOutWrap}>
          <Pressable
            style={({ pressed }) => [
              styles.signOutBtn,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={[styles.signOutText, { fontFamily: fontBold }]}>
              Sign out
            </Text>
          </Pressable>
          <Text style={[styles.version, { fontFamily: fontRegular }]}>
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </Fragment>
  );
};

const Card: FC<{ children: ReactNode }> = ({ children }) => (
  <View style={styles.card}>{children}</View>
);

const SectionHeader: FC<{
  title: string;
  fontFamily: string | undefined;
}> = ({ title, fontFamily }) => (
  <Text style={[styles.sectionHeader, { fontFamily }]}>
    {title.toUpperCase()}
  </Text>
);

const Chevron: FC = () =>
  isIOS ?
    <SymbolView name="chevron.right" size={12} tintColor="#5a5a5e" />
  : <Ionicons name="chevron-forward" size={14} color="#5a5a5e" />;

const Row: FC<{
  row: IRow;
  isLast: boolean;
  fontMedium: string | undefined;
  fontBold?: string | undefined;
  fontRegular: string | undefined;
}> = ({ row, isLast, fontMedium, fontBold, fontRegular }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        !isLast && styles.rowDivider,
        { backgroundColor: pressed ? "#2a2a2c" : "transparent" },
      ]}
    >
      <View style={styles.rowIcon}>
        {isIOS ?
          <SymbolView name={row.sfSymbol} size={15} tintColor="#fff" />
        : <Ionicons name={row.ionicon} size={16} color="#fff" />}
      </View>
      <Text style={[styles.rowLabel, { fontFamily: fontMedium }]}>
        {row.label}
      </Text>
      {row.badge ?
        <View style={styles.rowBadge}>
          <Text style={[styles.rowBadgeText, { fontFamily: fontBold }]}>
            {row.badge}
          </Text>
        </View>
      : null}
      {row.value ?
        <Text style={[styles.rowValue, { fontFamily: fontRegular }]}>
          {row.value}
        </Text>
      : null}
      <Chevron />
    </Pressable>
  );
};

export default ProfileScreen;

const CARD_BG = "#1c1c1e";
const DIVIDER = "rgba(255,255,255,0.06)";
const TEXT_PRIMARY = "#ececec";
const TEXT_MUTED = "#8e8e93";

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#0d0d0f",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  searchFieldWrap: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 4,
  },
  searchField: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  searchPlaceholder: {
    color: TEXT_MUTED,
    fontSize: 15,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor: "#f9ec9e",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    fontSize: 26,
    color: "#111",
  },
  headerMeta: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 20,
    color: TEXT_PRIMARY,
    letterSpacing: -0.4,
  },
  handle: {
    fontSize: 13,
    color: TEXT_MUTED,
    marginTop: 2,
  },
  editBtn: {
    backgroundColor: CARD_BG,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  editBtnText: {
    fontSize: 13,
    color: TEXT_PRIMARY,
    letterSpacing: -0.1,
  },
  sectionHeader: {
    fontSize: 12,
    color: TEXT_MUTED,
    letterSpacing: 0.6,
    paddingHorizontal: 32,
    marginTop: 26,
    marginBottom: 8,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: CARD_BG,
    borderRadius: 14,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: DIVIDER,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: "#2a2a2c",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    flex: 1,
    fontSize: 15,
    color: TEXT_PRIMARY,
    letterSpacing: -0.1,
  },
  rowValue: {
    fontSize: 14,
    color: TEXT_MUTED,
  },
  rowBadge: {
    backgroundColor: "#ffd60a",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  rowBadgeText: {
    fontSize: 10.5,
    color: "#111",
    letterSpacing: 0.4,
  },
  statusWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#30d158",
  },
  statusText: {
    fontSize: 14,
    color: TEXT_PRIMARY,
    letterSpacing: -0.1,
  },
  favoriteWrap: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
  },
  favoriteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  favoriteHeaderLeft: {
    flex: 1,
    minWidth: 0,
  },
  favoriteTitle: {
    fontSize: 15,
    color: TEXT_PRIMARY,
    letterSpacing: -0.2,
  },
  favoriteSubtitle: {
    fontSize: 12.5,
    color: TEXT_MUTED,
    marginTop: 2,
  },
  favoriteRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  favoriteCover: {
    width: 44,
    height: 60,
    borderRadius: 6,
    backgroundColor: "#2a2a2c",
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: CARD_BG,
  },
  favoriteCoverImg: {
    width: "100%",
    height: "100%",
  },
  signOutWrap: {
    marginTop: 28,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 14,
  },
  signOutBtn: {
    alignSelf: "stretch",
    backgroundColor: CARD_BG,
    borderRadius: 99,
    paddingVertical: 14,
    alignItems: "center",
  },
  signOutText: {
    fontSize: 15,
    color: "#ff453a",
    letterSpacing: -0.1,
  },
  version: {
    fontSize: 12,
    color: "#5a5a5e",
  },
});
