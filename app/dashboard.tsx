import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://10.12.75.73:3000";
const { width } = Dimensions.get("window");

export default function DashboardScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [slideAnim] = useState(new Animated.Value(-width));

  const stats = {
    totalUsers: 12,
    totalRevenue: 125430,
    activeProjects: 8,
    completedTasks: 43,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users`);
        const users = await response.json();
        if (users.length > 0) setUsername(users[0].username || "User");
        else setUsername("Guest");
      } catch {
        setUsername("User");
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: drawerOpen ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [drawerOpen]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => router.replace("/login"),
        style: "destructive",
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setDrawerOpen(true)}
          activeOpacity={0.7}
        >
          <View style={styles.iconContainer}>
            <View style={styles.iconBar} />
            <View style={styles.iconBar} />
            <View style={styles.iconBar} />
          </View>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Welcome, {username}</Text>
        </View>

        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["overview", "analytics", "projects"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.tabTextActive]}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={[styles.statCard, styles.statCardPrimary]}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, styles.statIconBlue]}>
                    <Text style={styles.statIconText}>👥</Text>
                  </View>
                  <Text style={styles.statTrend}>↑ 12%</Text>
                </View>
                <Text style={styles.statValue}>{stats.totalUsers}</Text>
                <Text style={styles.statLabel}>Total Users</Text>
              </View>

              <View style={[styles.statCard, styles.statCardSuccess]}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, styles.statIconGreen]}>
                    <Text style={styles.statIconText}>💰</Text>
                  </View>
                  <Text style={styles.statTrend}>↑ 8%</Text>
                </View>
                <Text style={styles.statValue}>
                  ${(stats.totalRevenue / 1000).toFixed(0)}K
                </Text>
                <Text style={styles.statLabel}>Revenue</Text>
              </View>

              <View style={[styles.statCard, styles.statCardWarning]}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, styles.statIconOrange]}>
                    <Text style={styles.statIconText}>📊</Text>
                  </View>
                  <Text style={styles.statTrend}>↑ 5%</Text>
                </View>
                <Text style={styles.statValue}>{stats.activeProjects}</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>

              <View style={[styles.statCard, styles.statCardInfo]}>
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, styles.statIconPurple]}>
                    <Text style={styles.statIconText}>✅</Text>
                  </View>
                  <Text style={styles.statTrend}>↑ 23%</Text>
                </View>
                <Text style={styles.statValue}>{stats.completedTasks}</Text>
                <Text style={styles.statLabel}>Tasks Done</Text>
              </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <TouchableOpacity>
                  <Text style={styles.sectionLink}>See all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.actionsGrid}>
                {[
                  { icon: "➕", label: "Add User", color: "#6366f1" },
                  { icon: "📁", label: "Projects", color: "#10b981" },
                  { icon: "📊", label: "Reports", color: "#f59e0b" },
                  { icon: "⚙️", label: "Settings", color: "#8b5cf6" },
                  { icon: "💬", label: "Messages", color: "#ec4899" },
                  { icon: "❓", label: "Help", color: "#06b6d4" },
                ].map((action, i) => (
                  <TouchableOpacity key={i} style={styles.actionCard}>
                    <View
                      style={[styles.actionIcon, { backgroundColor: action.color + "10" }]}
                    >
                      <Text style={styles.actionIconText}>{action.icon}</Text>
                    </View>
                    <Text style={styles.actionLabel}>{action.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Recent Activity */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                <TouchableOpacity>
                  <Text style={styles.sectionLink}>View all</Text>
                </TouchableOpacity>
              </View>

              {[
                {
                  icon: "✓",
                  title: "New user registered",
                  time: "2 hours ago",
                  color: "#10b981",
                },
                {
                  icon: "📊",
                  title: "Project updated",
                  time: "5 hours ago",
                  color: "#6366f1",
                },
                {
                  icon: "📝",
                  title: "Task completed",
                  time: "Yesterday",
                  color: "#f59e0b",
                },
                {
                  icon: "🔔",
                  title: "System notification",
                  time: "2 days ago",
                  color: "#ec4899",
                },
              ].map((item, i) => (
                <View key={i} style={styles.activityItem}>
                  <View
                    style={[styles.activityIcon, { backgroundColor: item.color + "10" }]}
                  >
                    <Text style={styles.activityIconText}>{item.icon}</Text>
                  </View>
                  <View style={styles.activityContent}>
                    <Text style={styles.activityTitle}>{item.title}</Text>
                    <Text style={styles.activityTime}>{item.time}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Upcoming Tasks */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
              <View style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <View style={styles.taskCheckbox} />
                  <Text style={styles.taskTitle}>Complete project review</Text>
                  <View style={[styles.taskPriority, styles.taskPriorityHigh]} />
                </View>
                <Text style={styles.taskDate}>Due: Tomorrow at 3:00 PM</Text>
              </View>
              <View style={styles.taskCard}>
                <View style={styles.taskHeader}>
                  <View style={styles.taskCheckbox} />
                  <Text style={styles.taskTitle}>Update documentation</Text>
                  <View style={[styles.taskPriority, styles.taskPriorityMedium]} />
                </View>
                <Text style={styles.taskDate}>Due: Dec 25, 2024</Text>
              </View>
            </View>
          </>
        )}

        {activeTab === "analytics" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Analytics</Text>

            <View style={styles.chartCard}>
              <View style={styles.chartIconContainer}>
                <Text style={styles.chartIcon}>📈</Text>
              </View>
              <Text style={styles.chartTitle}>Performance Overview</Text>
              <Text style={styles.chartSubtitle}>Last 30 days</Text>

              <View style={styles.chartPlaceholder}>
                <View style={styles.chartBar} />
                <View style={[styles.chartBar, { height: 120 }]} />
                <View style={[styles.chartBar, { height: 80 }]} />
                <View style={[styles.chartBar, { height: 140 }]} />
                <View style={[styles.chartBar, { height: 100 }]} />
                <View style={[styles.chartBar, { height: 160 }]} />
                <View style={styles.chartBar} />
              </View>
            </View>
          </View>
        )}

        {activeTab === "projects" && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>

            {[
              { name: "Website Redesign", progress: 75, color: "#6366f1" },
              { name: "Mobile App", progress: 45, color: "#10b981" },
              { name: "Marketing Campaign", progress: 90, color: "#f59e0b" },
              { name: "API Development", progress: 60, color: "#8b5cf6" },
            ].map((project, i) => (
              <View key={i} style={styles.projectCard}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectPercentage}>{project.progress}%</Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${project.progress}%`, backgroundColor: project.color },
                    ]}
                  />
                </View>
                <Text style={styles.projectStatus}>
                  {project.progress < 50 ? "In Progress" : project.progress < 100 ? "Almost Done" : "Completed"}
                </Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Drawer Modal */}
      <Modal
        visible={drawerOpen}
        transparent
        animationType="none"
        onRequestClose={() => setDrawerOpen(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setDrawerOpen(false)}
        >
          <Animated.View
            style={[
              styles.drawer,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <View style={styles.drawerHeader}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {username.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.drawerName}>{username}</Text>
              <Text style={styles.drawerEmail}>user@example.com</Text>
            </View>

            <ScrollView style={styles.drawerContent}>
              {[
                { icon: "📊", label: "Dashboard", color: "#6366f1" },
                { icon: "👥", label: "Users", color: "#10b981" },
                { icon: "📁", label: "Projects", color: "#f59e0b" },
                { icon: "📈", label: "Analytics", color: "#8b5cf6" },
                { icon: "💼", label: "Reports", color: "#ec4899" },
                { icon: "⚙️", label: "Settings", color: "#64748b" },
                { icon: "ℹ️", label: "About", color: "#06b6d4" },
              ].map((item, i) => (
                <TouchableOpacity key={i} style={styles.drawerItem}>
                  <View style={[styles.drawerItemIcon, { backgroundColor: item.color + "10" }]}>
                    <Text style={styles.drawerIcon}>{item.icon}</Text>
                  </View>
                  <Text style={styles.drawerLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.drawerFooter}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.drawerFooterIcon}>🚪</Text>
              <Text style={styles.drawerFooterText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    gap: 12,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    gap: 4,
  },
  iconBar: {
    width: 20,
    height: 2.5,
    backgroundColor: "#1e293b",
    borderRadius: 2,
  },
  headerContent: {
    flex: 1,
    gap: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#6366f1",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94a3b8",
  },
  tabTextActive: {
    color: "#6366f1",
  },
  scrollView: {
    flex: 1,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    gap: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
  },
  statCardPrimary: {
    borderLeftColor: "#6366f1",
  },
  statCardSuccess: {
    borderLeftColor: "#10b981",
  },
  statCardWarning: {
    borderLeftColor: "#f59e0b",
  },
  statCardInfo: {
    borderLeftColor: "#8b5cf6",
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statIconBlue: {
    backgroundColor: "#6366f110",
  },
  statIconGreen: {
    backgroundColor: "#10b98110",
  },
  statIconOrange: {
    backgroundColor: "#f59e0b10",
  },
  statIconPurple: {
    backgroundColor: "#8b5cf610",
  },
  statIconText: {
    fontSize: 24,
  },
  statTrend: {
    fontSize: 12,
    color: "#10b981",
    fontWeight: "600",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "500",
  },
  section: {
    padding: 16,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  sectionLink: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "600",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    width: "31%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  actionIconText: {
    fontSize: 28,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },
  activityItem: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    gap: 12,
    alignItems: "center",
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activityIconText: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
    gap: 2,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
  },
  activityTime: {
    fontSize: 12,
    color: "#94a3b8",
  },
  taskCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
  },
  taskHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#cbd5e1",
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
  },
  taskPriority: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  taskPriorityHigh: {
    backgroundColor: "#ef4444",
  },
  taskPriorityMedium: {
    backgroundColor: "#f59e0b",
  },
  taskDate: {
    fontSize: 13,
    color: "#64748b",
  },
  chartCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  chartIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6366f110",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  chartIcon: {
    fontSize: 40,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  chartSubtitle: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 24,
  },
  chartPlaceholder: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    height: 180,
    paddingHorizontal: 8,
  },
  chartBar: {
    flex: 1,
    backgroundColor: "#6366f1",
    borderRadius: 4,
    height: 60,
    opacity: 0.7,
  },
  projectCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  projectName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1e293b",
  },
  projectPercentage: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6366f1",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  projectStatus: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  drawer: {
    width: width * 0.8,
    height: "100%",
    backgroundColor: "#ffffff",
  },
  drawerHeader: {
    backgroundColor: "#6366f1",
    padding: 24,
    paddingTop: 60,
    alignItems: "center",
    gap: 12,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#6366f1",
  },
  drawerName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
  },
  drawerEmail: {
    fontSize: 14,
    color: "#e0e7ff",
  },
  drawerContent: {
    flex: 1,
    paddingVertical: 16,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  drawerItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  drawerIcon: {
    fontSize: 20,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },
  drawerFooter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    gap: 12,
  },
  drawerFooterIcon: {
    fontSize: 22,
  },
  drawerFooterText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ef4444",
  },
});

