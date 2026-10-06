import { useMemo, useState } from "react";
import {
    Activity,
    ArrowRight,
    Award,
    Bell,
    BookOpen,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    ChevronRight,
    Clock3,
    FileText,
    GraduationCap,
    HeartHandshake,
    LayoutDashboard,
    Menu,
    MessageCircle,
    MoreHorizontal,
    Paperclip,
    Search,
    Settings,
    ShieldCheck,
    Star,
    Target,
    TrendingUp,
    UserRound,
    X,
    CircleDollarSign,
} from "lucide-react";

/* =========================================================
   TYPES
   ========================================================= */

type TaskStatus = "Pending" | "In Progress" | "Completed";

type Task = {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
    priority: "High" | "Medium" | "Low";
};

type ActivityItem = {
    id: number;
    title: string;
    description: string;
    time: string;
    type: "success" | "info" | "warning";
};

/* =========================================================
   MOCK DATA
   ========================================================= */

const student = {
    name: "Aarav Kumar",
    firstName: "Aarav",
    studentId: "SNH-STU-2026-0148",
    course: "BCA",
    institution: "Sandip University",
    year: "3rd Year",
    location: "Lucknow, Uttar Pradesh",
    avatar: "AK",
};

const scholarship = {
    programme: "SnehAsha Higher Education Scholarship",
    status: "Approved",
    amount: "₹45,000",
    disbursed: "₹30,000",
    pending: "₹15,000",
    nextDisbursement: "15 Oct 2026",
};

const academic = {
    overall: 82,
    semester: "Semester VI",
    cgpa: "8.1",
    attendance: 91,
    credits: "108 / 120",
};

const programmeProgress = 76;

const tasks: Task[] = [
    {
        id: 1,
        title: "Upload Semester VI Marksheet",
        description: "Submit your latest academic document.",
        dueDate: "08 Oct 2026",
        status: "Pending",
        priority: "High",
    },
    {
        id: 2,
        title: "Mentoring Session",
        description: "Monthly progress discussion with your mentor.",
        dueDate: "10 Oct 2026",
        status: "In Progress",
        priority: "Medium",
    },
    {
        id: 3,
        title: "Career Assessment",
        description: "Complete your career interest assessment.",
        dueDate: "12 Oct 2026",
        status: "Pending",
        priority: "Medium",
    },
    {
        id: 4,
        title: "Digital Literacy Module",
        description: "Complete the Cyber Safety module.",
        dueDate: "05 Oct 2026",
        status: "Completed",
        priority: "Low",
    },
];

const activities: ActivityItem[] = [
    {
        id: 1,
        title: "Scholarship installment approved",
        description: "₹15,000 has been scheduled for the next disbursement.",
        time: "2 hours ago",
        type: "success",
    },
    {
        id: 2,
        title: "Mentor session scheduled",
        description: "Your next session is scheduled for 10 October.",
        time: "Yesterday",
        type: "info",
    },
    {
        id: 3,
        title: "Document required",
        description: "Semester VI marksheet is required for verification.",
        time: "2 days ago",
        type: "warning",
    },
];

/* =========================================================
   COMPONENT
   ========================================================= */

export default function StudentDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [search, setSearch] = useState("");

    const filteredTasks = useMemo(() => {
        const value = search.trim().toLowerCase();

        if (!value) {
            return tasks;
        }

        return tasks.filter(
            (task) =>
                task.title.toLowerCase().includes(value) ||
                task.description.toLowerCase().includes(value),
        );
    }, [search]);

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed",
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status !== "Completed",
    ).length;

    const navigation = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "My Programme",
            icon: GraduationCap,
        },
        {
            label: "Scholarship",
            icon: Award,
        },
        {
            label: "Academics",
            icon: BookOpen,
        },
        {
            label: "Mentoring",
            icon: HeartHandshake,
        },
        {
            label: "Career",
            icon: BriefcaseBusiness,
        },
        {
            label: "Documents",
            icon: FileText,
        },
        {
            label: "Tasks",
            icon: CheckCircle2,
        },
    ];

    return (
        <div className="student-dashboard">
            {/* =====================================================
          MOBILE OVERLAY
          ===================================================== */}

            {sidebarOpen && (
                <button
                    className="sidebar-overlay"
                    type="button"
                    aria-label="Close navigation"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* =====================================================
          SIDEBAR
          ===================================================== */}

            <aside className={`student-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-brand">
                    <div className="brand-mark">
                        <img src="/images/Logo.webp" alt="SnehAsha" />
                    </div>

                    <button
                        className="mobile-close"
                        type="button"
                        aria-label="Close sidebar"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="student-profile-mini">
                    <div className="profile-avatar">
                        {student.avatar}
                    </div>

                    <div className="profile-mini-text">
                        <strong>{student.name}</strong>
                        <span>Student</span>
                    </div>
                </div>

                <div className="sidebar-section-title">
                    WORKSPACE
                </div>

                <nav className="sidebar-navigation">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const active = activeMenu === item.label;

                        return (
                            <button
                                key={item.label}
                                type="button"
                                className={`sidebar-link ${active ? "active" : ""}`}
                                onClick={() => {
                                    setActiveMenu(item.label);
                                    setSidebarOpen(false);
                                }}
                            >
                                <Icon size={18} strokeWidth={1.8} />
                                <span>{item.label}</span>

                                {item.label === "Tasks" && pendingTasks > 0 && (
                                    <span className="sidebar-count">
                                        {pendingTasks}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="sidebar-spacer" />

                <div className="sidebar-help">
                    <div className="help-icon">
                        <MessageCircle size={18} />
                    </div>

                    <div>
                        <strong>Need help?</strong>
                        <span>Contact SnehAsha support</span>
                    </div>

                    <ChevronRight size={16} />
                </div>

                <div className="sidebar-bottom">
                    <button
                        type="button"
                        className="sidebar-bottom-link"
                        onClick={() => setActiveMenu("Settings")}
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </button>

                    <button
                        type="button"
                        className="sidebar-bottom-link"
                    >
                        <ShieldCheck size={18} />
                        <span>Privacy & Security</span>
                    </button>
                </div>
            </aside>

            {/* =====================================================
          MAIN AREA
          ===================================================== */}

            <main className="student-main">
                {/* ===================================================
            TOP NAVBAR
            =================================================== */}

                <header className="student-navbar">
                    <div className="navbar-left">
                        <button
                            type="button"
                            className="mobile-menu-button"
                            aria-label="Open navigation"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu size={22} />
                        </button>

                        <div className="breadcrumb">
                            <span>Student Portal</span>
                            <ChevronRight size={15} />
                            <strong>{activeMenu}</strong>
                        </div>
                    </div>

                    <div className="navbar-right">
                        <div className="search-box">
                            <Search size={17} />

                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                            />
                        </div>

                        <button
                            type="button"
                            className="notification-button"
                            aria-label="Notifications"
                        >
                            <Bell size={19} />

                            <span className="notification-dot" />
                        </button>

                        <div className="navbar-profile">
                            <div className="navbar-avatar">
                                {student.avatar}
                            </div>

                            <div className="navbar-profile-info">
                                <strong>{student.name}</strong>
                                <span>Student</span>
                            </div>

                            <ChevronRight
                                size={15}
                                className="profile-chevron"
                            />
                        </div>
                    </div>
                </header>

                {/* ===================================================
            PAGE CONTENT
            =================================================== */}

                <div className="student-content">
                    {/* =================================================
              WELCOME HEADER
              ================================================= */}

                    <section className="welcome-section">
                        <div>
                            <div className="welcome-eyebrow">
                                <span className="status-pulse" />
                                Student portal
                            </div>

                            <h1>
                                Welcome back, {student.firstName}
                            </h1>

                            <p>
                                Here&apos;s an overview of your programme,
                                academics and scholarship journey.
                            </p>
                        </div>

                        <div className="welcome-actions">
                            <button
                                type="button"
                                className="outline-action"
                            >
                                <CalendarDays size={17} />
                                <span>Academic Calendar</span>
                            </button>

                            <button
                                type="button"
                                className="primary-action"
                            >
                                <FileText size={17} />
                                <span>View Profile</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </section>

                    {/* =================================================
              PROFILE STRIP
              ================================================= */}

                    <section className="profile-strip">
                        <div className="profile-strip-main">
                            <div className="large-avatar">
                                {student.avatar}
                            </div>

                            <div className="profile-details">
                                <div className="profile-name-row">
                                    <h2>{student.name}</h2>

                                    <span className="verified-badge">
                                        <CheckCircle2 size={13} />
                                        Verified
                                    </span>
                                </div>

                                <p>
                                    {student.course} · {student.year} ·{" "}
                                    {student.institution}
                                </p>

                                <span className="student-id">
                                    Student ID: {student.studentId}
                                </span>
                            </div>
                        </div>

                        <div className="profile-strip-meta">
                            <div>
                                <span>Programme</span>
                                <strong>Higher Education</strong>
                            </div>

                            <div>
                                <span>Location</span>
                                <strong>{student.location}</strong>
                            </div>

                            <button
                                type="button"
                                className="profile-arrow"
                            >
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </section>

                    {/* =================================================
              KPI CARDS
              ================================================= */}

                    <section className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-card-top">
                                <div className="stat-icon gold">
                                    <Award size={20} />
                                </div>

                                <span className="stat-label">
                                    Scholarship
                                </span>
                            </div>

                            <div className="stat-value">
                                {scholarship.amount}
                            </div>

                            <div className="stat-footer">
                                <span className="positive">
                                    <TrendingUp size={14} />
                                    Approved
                                </span>

                                <span>Total support</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-top">
                                <div className="stat-icon blue">
                                    <BookOpen size={20} />
                                </div>

                                <span className="stat-label">
                                    Academic Score
                                </span>
                            </div>

                            <div className="stat-value">
                                {academic.overall}%
                            </div>

                            <div className="stat-footer">
                                <span className="positive">
                                    <TrendingUp size={14} />
                                    Good standing
                                </span>

                                <span>Overall</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-top">
                                <div className="stat-icon green">
                                    <Activity size={20} />
                                </div>

                                <span className="stat-label">
                                    Attendance
                                </span>
                            </div>

                            <div className="stat-value">
                                {academic.attendance}%
                            </div>

                            <div className="stat-footer">
                                <span className="positive">
                                    <CheckCircle2 size={14} />
                                    On track
                                </span>

                                <span>This semester</span>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-top">
                                <div className="stat-icon purple">
                                    <Target size={20} />
                                </div>

                                <span className="stat-label">
                                    Programme
                                </span>
                            </div>

                            <div className="stat-value">
                                {programmeProgress}%
                            </div>

                            <div className="stat-footer">
                                <span className="neutral">
                                    {completedTasks} tasks done
                                </span>

                                <span>Progress</span>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
              MAIN GRID
              ================================================= */}

                    <section className="dashboard-grid">
                        {/* ===============================================
                LEFT COLUMN
                =============================================== */}

                        <div className="dashboard-left">
                            {/* ---------------------------------------------
                  SCHOLARSHIP CARD
                  --------------------------------------------- */}

                            <div className="panel scholarship-panel">
                                <div className="panel-header">
                                    <div>
                                        <div className="panel-kicker">
                                            Financial support
                                        </div>

                                        <h3>Scholarship Overview</h3>
                                    </div>

                                    <button
                                        type="button"
                                        className="panel-more"
                                    >
                                        <MoreHorizontal size={19} />
                                    </button>
                                </div>

                                <div className="scholarship-content">
                                    <div className="scholarship-main">
                                        <div className="scholarship-icon">
                                            <CircleDollarSign size={23} />
                                        </div>

                                        <div>
                                            <span className="scholarship-label">
                                                Current programme
                                            </span>

                                            <strong>
                                                {scholarship.programme}
                                            </strong>

                                            <div className="approved-status">
                                                <CheckCircle2 size={14} />
                                                {scholarship.status}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="scholarship-amount">
                                        <span>Total award</span>
                                        <strong>{scholarship.amount}</strong>
                                    </div>
                                </div>

                                <div className="disbursement-bar">
                                    <div className="disbursement-header">
                                        <span>Disbursement progress</span>

                                        <strong>
                                            {scholarship.disbursed} /{" "}
                                            {scholarship.amount}
                                        </strong>
                                    </div>

                                    <div className="progress-track">
                                        <div
                                            className="progress-fill gold-fill"
                                            style={{ width: "66.66%" }}
                                        />
                                    </div>

                                    <div className="disbursement-footer">
                                        <span>
                                            <strong>
                                                {scholarship.pending}
                                            </strong>{" "}
                                            remaining
                                        </span>

                                        <span>
                                            Next: {scholarship.nextDisbursement}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="panel-link"
                                >
                                    View scholarship details
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            {/* ---------------------------------------------
                  ACADEMIC PERFORMANCE
                  --------------------------------------------- */}

                            <div className="panel academic-panel">
                                <div className="panel-header">
                                    <div>
                                        <div className="panel-kicker">
                                            Education
                                        </div>

                                        <h3>Academic Performance</h3>
                                    </div>

                                    <button
                                        type="button"
                                        className="panel-link-small"
                                    >
                                        View records
                                        <ArrowRight size={14} />
                                    </button>
                                </div>

                                <div className="academic-body">
                                    <div className="academic-score">
                                        <div className="score-circle">
                                            <div>
                                                <strong>{academic.overall}</strong>
                                                <span>%</span>
                                            </div>
                                        </div>

                                        <div className="score-description">
                                            <strong>Strong performance</strong>
                                            <span>
                                                You are performing well this semester.
                                            </span>

                                            <div className="score-rating">
                                                <Star
                                                    size={15}
                                                    fill="currentColor"
                                                />
                                                Above programme average
                                            </div>
                                        </div>
                                    </div>

                                    <div className="academic-metrics">
                                        <div className="academic-metric">
                                            <span>Current CGPA</span>
                                            <strong>{academic.cgpa}</strong>
                                        </div>

                                        <div className="academic-metric">
                                            <span>Attendance</span>
                                            <strong>
                                                {academic.attendance}%
                                            </strong>
                                        </div>

                                        <div className="academic-metric">
                                            <span>Credits</span>
                                            <strong>{academic.credits}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ---------------------------------------------
                  TASKS
                  --------------------------------------------- */}

                            <div className="panel tasks-panel">
                                <div className="panel-header">
                                    <div>
                                        <div className="panel-kicker">
                                            Action required
                                        </div>

                                        <h3>My Tasks</h3>
                                    </div>

                                    <button
                                        type="button"
                                        className="panel-link-small"
                                    >
                                        View all
                                        <ArrowRight size={14} />
                                    </button>
                                </div>

                                <div className="tasks-list">
                                    {filteredTasks.length === 0 ? (
                                        <div className="empty-search">
                                            <Search size={24} />
                                            <strong>No tasks found</strong>
                                            <span>
                                                Try another search term.
                                            </span>
                                        </div>
                                    ) : (
                                        filteredTasks.map((task) => (
                                            <div
                                                className="task-row"
                                                key={task.id}
                                            >
                                                <div
                                                    className={`task-status-icon ${task.status
                                                        .toLowerCase()
                                                        .replace(" ", "-")}`}
                                                >
                                                    {task.status === "Completed" ? (
                                                        <CheckCircle2 size={18} />
                                                    ) : task.status === "In Progress" ? (
                                                        <Clock3 size={18} />
                                                    ) : (
                                                        <FileText size={18} />
                                                    )}
                                                </div>

                                                <div className="task-info">
                                                    <div className="task-title-row">
                                                        <strong>{task.title}</strong>

                                                        <span
                                                            className={`priority ${task.priority.toLowerCase()}`}
                                                        >
                                                            {task.priority}
                                                        </span>
                                                    </div>

                                                    <p>{task.description}</p>

                                                    <span className="task-due">
                                                        <CalendarDays size={13} />
                                                        Due {task.dueDate}
                                                    </span>
                                                </div>

                                                <div className="task-right">
                                                    <span
                                                        className={`task-status ${task.status
                                                            .toLowerCase()
                                                            .replace(" ", "-")}`}
                                                    >
                                                        {task.status}
                                                    </span>

                                                    <ChevronRight size={17} />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* ===============================================
                RIGHT COLUMN
                =============================================== */}

                        <div className="dashboard-right">
                            {/* ---------------------------------------------
                  PROGRAMME PROGRESS
                  --------------------------------------------- */}

                            <div className="panel programme-panel">
                                <div className="panel-header">
                                    <div>
                                        <div className="panel-kicker">
                                            Your journey
                                        </div>

                                        <h3>Programme Progress</h3>
                                    </div>

                                    <button
                                        type="button"
                                        className="panel-more"
                                    >
                                        <MoreHorizontal size={19} />
                                    </button>
                                </div>

                                <div className="programme-progress">
                                    <div className="circular-progress">
                                        <svg
                                            viewBox="0 0 120 120"
                                            className="progress-svg"
                                        >
                                            <circle
                                                cx="60"
                                                cy="60"
                                                r="50"
                                                className="circle-bg"
                                            />

                                            <circle
                                                cx="60"
                                                cy="60"
                                                r="50"
                                                className="circle-progress"
                                                strokeDasharray="314"
                                                strokeDashoffset={
                                                    314 -
                                                    (314 * programmeProgress) / 100
                                                }
                                            />
                                        </svg>

                                        <div className="circular-value">
                                            <strong>{programmeProgress}%</strong>
                                            <span>Complete</span>
                                        </div>
                                    </div>

                                    <div className="programme-details">
                                        <div className="programme-step completed">
                                            <div className="step-icon">
                                                <CheckCircle2 size={15} />
                                            </div>

                                            <div>
                                                <strong>Scholarship onboarding</strong>
                                                <span>Completed</span>
                                            </div>
                                        </div>

                                        <div className="programme-step completed">
                                            <div className="step-icon">
                                                <CheckCircle2 size={15} />
                                            </div>

                                            <div>
                                                <strong>Academic verification</strong>
                                                <span>Completed</span>
                                            </div>
                                        </div>

                                        <div className="programme-step current">
                                            <div className="step-icon">
                                                <Activity size={15} />
                                            </div>

                                            <div>
                                                <strong>Mentoring & development</strong>
                                                <span>In progress</span>
                                            </div>
                                        </div>

                                        <div className="programme-step">
                                            <div className="step-icon">
                                                <Target size={15} />
                                            </div>

                                            <div>
                                                <strong>Career readiness</strong>
                                                <span>Upcoming</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ---------------------------------------------
                  MENTOR
                  --------------------------------------------- */}

                            <div className="panel mentor-panel">
                                <div className="panel-header">
                                    <div>
                                        <div className="panel-kicker">
                                            Guidance
                                        </div>

                                        <h3>My Mentor</h3>
                                    </div>

                                    <button
                                        type="button"
                                        className="panel-more"
                                    >
                                        <MoreHorizontal size={19} />
                                    </button>
                                </div>

                                <div className="mentor-profile">
                                    <div className="mentor-avatar">
                                        RS
                                    </div>

                                    <div className="mentor-info">
                                        <strong>Rahul Sharma</strong>
                                        <span>Career & Academic Mentor</span>

                                        <div className="mentor-rating">
                                            <Star
                                                size={14}
                                                fill="currentColor"
                                            />
                                            <span>4.9</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mentor-next">
                                    <div className="mentor-next-icon">
                                        <CalendarDays size={17} />
                                    </div>

                                    <div>
                                        <span>Next mentoring session</span>
                                        <strong>
                                            10 October 2026 · 4:00 PM
                                        </strong>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="mentor-button"
                                >
                                    <MessageCircle size={16} />
                                    Message mentor
                                </button>
                            </div>

                            {/* ---------------------------------------------
                  CAREER READINESS
                  --------------------------------------------- */}

                            <div className="panel career-panel">
                                <div className="career-top">
                                    <div className="career-icon">
                                        <BriefcaseBusiness size={21} />
                                    </div>

                                    <div>
                                        <div className="panel-kicker">
                                            Career development
                                        </div>

                                        <h3>Career Readiness</h3>
                                    </div>
                                </div>

                                <p>
                                    Complete your career assessment to get
                                    personalized guidance and opportunities.
                                </p>

                                <div className="career-progress">
                                    <div>
                                        <span>Profile completion</span>
                                        <strong>64%</strong>
                                    </div>

                                    <div className="progress-track">
                                        <div
                                            className="progress-fill purple-fill"
                                            style={{ width: "64%" }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="career-button"
                                >
                                    Continue assessment
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            {/* ---------------------------------------------
                  RECENT ACTIVITY
                  --------------------------------------------- */}

                            <div className="panel activity-panel">
                                <div className="panel-header">
                                    <div>
                                        <div className="panel-kicker">
                                            Updates
                                        </div>

                                        <h3>Recent Activity</h3>
                                    </div>

                                    <button
                                        type="button"
                                        className="panel-link-small"
                                    >
                                        See all
                                    </button>
                                </div>

                                <div className="activity-list">
                                    {activities.map((activity) => (
                                        <div
                                            className="activity-item"
                                            key={activity.id}
                                        >
                                            <div
                                                className={`activity-dot ${activity.type}`}
                                            />

                                            <div className="activity-content">
                                                <strong>
                                                    {activity.title}
                                                </strong>

                                                <p>
                                                    {activity.description}
                                                </p>

                                                <span>
                                                    {activity.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* =================================================
              QUICK ACTIONS
              ================================================= */}

                    <section className="quick-section">
                        <div className="section-heading">
                            <div>
                                <span>Shortcuts</span>
                                <h2>Quick Actions</h2>
                            </div>
                        </div>

                        <div className="quick-grid">
                            <button
                                type="button"
                                className="quick-card"
                            >
                                <div className="quick-card-icon gold">
                                    <FileText size={20} />
                                </div>

                                <div>
                                    <strong>My Documents</strong>
                                    <span>
                                        Upload and manage documents
                                    </span>
                                </div>

                                <ArrowRight size={17} />
                            </button>

                            <button
                                type="button"
                                className="quick-card"
                            >
                                <div className="quick-card-icon blue">
                                    <BookOpen size={20} />
                                </div>

                                <div>
                                    <strong>Academic Records</strong>
                                    <span>
                                        View marks and performance
                                    </span>
                                </div>

                                <ArrowRight size={17} />
                            </button>

                            <button
                                type="button"
                                className="quick-card"
                            >
                                <div className="quick-card-icon green">
                                    <HeartHandshake size={20} />
                                </div>

                                <div>
                                    <strong>Mentoring</strong>
                                    <span>
                                        Connect with your mentor
                                    </span>
                                </div>

                                <ArrowRight size={17} />
                            </button>

                            <button
                                type="button"
                                className="quick-card"
                            >
                                <div className="quick-card-icon purple">
                                    <BriefcaseBusiness size={20} />
                                </div>

                                <div>
                                    <strong>Career Support</strong>
                                    <span>
                                        Explore career opportunities
                                    </span>
                                </div>

                                <ArrowRight size={17} />
                            </button>
                        </div>
                    </section>

                    {/* =================================================
              FOOTER
              ================================================= */}

                    <footer className="student-footer">
                        <span>
                            © 2026 SnehAsha. Empowering futures through
                            education.
                        </span>

                        <div>
                            <button type="button">Help Centre</button>
                            <button type="button">Privacy</button>
                            <button type="button">Terms</button>
                        </div>
                    </footer>
                </div>
            </main>

            {/* =====================================================
          COMPONENT STYLES
          ===================================================== */}

            <style>{`
        * {
          box-sizing: border-box;
        }

        .student-dashboard {
          min-height: 100vh;
          display: flex;
          background: #f7f4ee;
          color: #172033;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        /* =====================================================
           SIDEBAR
           ===================================================== */

        .student-sidebar {
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
          width: 248px;
          display: flex;
          flex-direction: column;
          background: #fffdf9;
          border-right: 1px solid #ebe5da;
          z-index: 50;
        }

        .sidebar-brand {
          height: 82px;
          display: flex;
          align-items: center;
          padding: 0 25px;
          border-bottom: 1px solid #eee8df;
        }

        .brand-mark {
          width: 118px;
          display: flex;
          align-items: center;
        }

        .brand-mark img {
          display: block;
          width: 118px;
          height: auto;
          object-fit: contain;
        }

        .mobile-close {
          display: none;
          margin-left: auto;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          border: 0;
          background: transparent;
          color: #667085;
          cursor: pointer;
        }

        .student-profile-mini {
          margin: 20px 16px 18px;
          padding: 13px;
          display: flex;
          align-items: center;
          gap: 11px;
          border: 1px solid #eee8df;
          border-radius: 12px;
          background: #fffaf1;
        }

        .profile-avatar,
        .navbar-avatar,
        .large-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-weight: 700;
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f5d78e;
          color: #694d13;
          font-size: 13px;
        }

        .profile-mini-text {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .profile-mini-text strong {
          color: #263247;
          font-size: 13px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-mini-text span {
          color: #8a919d;
          font-size: 11px;
        }

        .sidebar-section-title {
          padding: 0 24px;
          margin: 6px 0 9px;
          color: #9b9589;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.1px;
        }

        .sidebar-navigation {
          padding: 0 12px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .sidebar-link {
          width: 100%;
          min-height: 43px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 13px;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: #667085;
          font-size: 13px;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition:
            background 160ms ease,
            color 160ms ease,
            transform 160ms ease;
        }

        .sidebar-link:hover {
          background: #faf4e8;
          color: #8b6114;
        }

        .sidebar-link.active {
          background: #fff1d0;
          color: #a56d0b;
          font-weight: 650;
        }

        .sidebar-link.active svg {
          color: #d9951d;
        }

        .sidebar-count {
          min-width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-left: auto;
          padding: 0 6px;
          border-radius: 10px;
          background: #f3b43d;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
        }

        .sidebar-spacer {
          flex: 1;
        }

        .sidebar-help {
          margin: 14px 15px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 9px;
          border-radius: 10px;
          background: #f8f3e9;
          color: #657080;
        }

        .help-icon {
          width: 31px;
          height: 31px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 8px;
          background: #fff;
          color: #d9951d;
        }

        .sidebar-help > div:nth-child(2) {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sidebar-help strong {
          color: #344054;
          font-size: 11px;
        }

        .sidebar-help span {
          color: #8a919d;
          font-size: 9px;
          line-height: 1.35;
        }

        .sidebar-bottom {
          padding: 11px 12px 16px;
          border-top: 1px solid #eee8df;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sidebar-bottom-link {
          min-height: 38px;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 12px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: #727b89;
          font-size: 12px;
          cursor: pointer;
          text-align: left;
        }

        .sidebar-bottom-link:hover {
          background: #faf4e8;
          color: #9a690f;
        }

        /* =====================================================
           MAIN
           ===================================================== */

        .student-main {
          width: calc(100% - 248px);
          min-width: 0;
          margin-left: 248px;
        }

        .student-navbar {
          position: sticky;
          top: 0;
          z-index: 30;
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 0 34px;
          background: rgba(255, 253, 249, 0.94);
          border-bottom: 1px solid #ebe5da;
          backdrop-filter: blur(12px);
        }

        .navbar-left,
        .navbar-right {
          display: flex;
          align-items: center;
        }

        .navbar-left {
          gap: 12px;
          min-width: 0;
        }

        .mobile-menu-button {
          display: none;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border: 1px solid #e5dfd5;
          border-radius: 9px;
          background: #fff;
          color: #344054;
          cursor: pointer;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #9a9388;
          font-size: 12px;
        }

        .breadcrumb strong {
          color: #344054;
          font-weight: 650;
        }

        .navbar-right {
          gap: 15px;
        }

        .search-box {
          width: 235px;
          height: 39px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 12px;
          border: 1px solid #e4ded5;
          border-radius: 8px;
          background: #fff;
          color: #98a0ac;
        }

        .search-box:focus-within {
          border-color: #e5ad43;
          box-shadow: 0 0 0 3px rgba(231, 171, 57, 0.10);
        }

        .search-box input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: #344054;
          font-size: 12px;
        }

        .search-box input::placeholder {
          color: #a1a7b0;
        }

        .notification-button {
          position: relative;
          width: 39px;
          height: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e4ded5;
          border-radius: 9px;
          background: #fff;
          color: #5e6877;
          cursor: pointer;
        }

        .notification-button:hover {
          color: #b47a18;
          background: #fffaf0;
        }

        .notification-dot {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e6a52f;
          border: 1px solid #fff;
        }

        .navbar-profile {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
        }

        .navbar-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #f5d78e;
          color: #694d13;
          font-size: 11px;
        }

        .navbar-profile-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .navbar-profile-info strong {
          color: #344054;
          font-size: 11px;
        }

        .navbar-profile-info span {
          color: #98a0ac;
          font-size: 10px;
        }

        .profile-chevron {
          color: #98a0ac;
          transform: rotate(90deg);
        }

        /* =====================================================
           CONTENT
           ===================================================== */

        .student-content {
          width: 100%;
          max-width: 1560px;
          margin: 0 auto;
          padding: 31px 34px 40px;
        }

        .welcome-section {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 24px;
        }

        .welcome-eyebrow {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 8px;
          color: #b27a19;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .status-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #6bb88a;
          box-shadow: 0 0 0 4px rgba(107, 184, 138, 0.12);
        }

        .welcome-section h1 {
          margin: 0;
          color: #1d2a3f;
          font-size: clamp(26px, 2.4vw, 34px);
          font-weight: 700;
          letter-spacing: -0.9px;
          line-height: 1.15;
        }

        .welcome-section p {
          margin: 8px 0 0;
          color: #7c8491;
          font-size: 13px;
          line-height: 1.55;
        }

        .welcome-actions {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-shrink: 0;
        }

        .outline-action,
        .primary-action {
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 14px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 650;
          cursor: pointer;
          transition:
            transform 160ms ease,
            box-shadow 160ms ease,
            background 160ms ease;
        }

        .outline-action {
          border: 1px solid #ddd6cb;
          background: #fffdf9;
          color: #596273;
        }

        .primary-action {
          border: 1px solid #e4a52f;
          background: #e8a62e;
          color: #fff;
          box-shadow: 0 6px 15px rgba(219, 157, 34, 0.16);
        }

        .outline-action:hover,
        .primary-action:hover {
          transform: translateY(-1px);
        }

        .primary-action:hover {
          box-shadow: 0 9px 20px rgba(219, 157, 34, 0.23);
        }

        /* =====================================================
           PROFILE STRIP
           ===================================================== */

        .profile-strip {
          min-height: 104px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 18px 20px;
          margin-bottom: 20px;
          border: 1px solid #e9e2d7;
          border-radius: 13px;
          background: #fffdf9;
          box-shadow: 0 4px 18px rgba(45, 49, 58, 0.025);
        }

        .profile-strip-main {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .large-avatar {
          width: 66px;
          height: 66px;
          border-radius: 12px;
          background: linear-gradient(
            145deg,
            #f8dfa4,
            #efc86f
          );
          color: #684e19;
          font-size: 18px;
          box-shadow: inset 0 0 0 1px rgba(139, 98, 20, 0.08);
        }

        .profile-details {
          min-width: 0;
        }

        .profile-name-row {
          display: flex;
          align-items: center;
          gap: 9px;
          flex-wrap: wrap;
        }

        .profile-name-row h2 {
          margin: 0;
          color: #253247;
          font-size: 17px;
          font-weight: 700;
        }

        .verified-badge {
          height: 21px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 0 7px;
          border-radius: 11px;
          background: #eef8f1;
          color: #43845d;
          font-size: 9px;
          font-weight: 700;
        }

        .profile-details p {
          margin: 4px 0 3px;
          color: #6f7886;
          font-size: 11px;
        }

        .student-id {
          color: #9ba1aa;
          font-size: 9px;
        }

        .profile-strip-meta {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-shrink: 0;
        }

        .profile-strip-meta > div {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .profile-strip-meta span {
          color: #9a9fa8;
          font-size: 9px;
        }

        .profile-strip-meta strong {
          color: #465064;
          font-size: 11px;
          font-weight: 650;
        }

        .profile-arrow {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e4ddd3;
          border-radius: 8px;
          background: #fff;
          color: #737c89;
          cursor: pointer;
        }

        /* =====================================================
           STATS
           ===================================================== */

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 20px;
        }

        .stat-card {
          min-width: 0;
          padding: 17px 17px 15px;
          border: 1px solid #e9e2d7;
          border-radius: 12px;
          background: #fffdf9;
          box-shadow: 0 4px 16px rgba(45, 49, 58, 0.022);
        }

        .stat-card-top {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .stat-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
        }

        .stat-icon.gold,
        .quick-card-icon.gold {
          background: #fff1d3;
          color: #c88a1c;
        }

        .stat-icon.blue,
        .quick-card-icon.blue {
          background: #eaf3fb;
          color: #5485b6;
        }

        .stat-icon.green,
        .quick-card-icon.green {
          background: #e9f6ee;
          color: #4d9b6a;
        }

        .stat-icon.purple,
        .quick-card-icon.purple {
          background: #f0ecfa;
          color: #8068b0;
        }

        .stat-label {
          color: #858d99;
          font-size: 10px;
          font-weight: 600;
        }

        .stat-value {
          margin-top: 13px;
          color: #243147;
          font-size: 25px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .stat-footer {
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          color: #a0a5ad;
          font-size: 9px;
        }

        .positive,
        .neutral {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-weight: 650;
        }

        .positive {
          color: #4b9566;
        }

        .neutral {
          color: #8b6d31;
        }

        /* =====================================================
           MAIN DASHBOARD GRID
           ===================================================== */

        .dashboard-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.5fr) minmax(330px, 0.9fr);
          gap: 18px;
          align-items: start;
        }

        .dashboard-left,
        .dashboard-right {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .panel {
          min-width: 0;
          padding: 20px;
          border: 1px solid #e9e2d7;
          border-radius: 13px;
          background: #fffdf9;
          box-shadow: 0 4px 18px rgba(45, 49, 58, 0.022);
        }

        .panel-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 18px;
        }

        .panel-kicker {
          margin-bottom: 4px;
          color: #b18a4b;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.9px;
        }

        .panel h3 {
          margin: 0;
          color: #2b374b;
          font-size: 15px;
          font-weight: 700;
        }

        .panel-more {
          width: 29px;
          height: 29px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 0;
          border-radius: 7px;
          background: transparent;
          color: #8f97a2;
          cursor: pointer;
        }

        .panel-more:hover {
          background: #f8f2e8;
        }

        .panel-link-small {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 0;
          border: 0;
          background: transparent;
          color: #b27a19;
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
        }

        .panel-link-small:hover {
          color: #8d5d0b;
        }

        /* =====================================================
           SCHOLARSHIP
           ===================================================== */

        .scholarship-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 15px;
          border: 1px solid #eee6d9;
          border-radius: 10px;
          background: #fffbf4;
        }

        .scholarship-main {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .scholarship-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 11px;
          background: #f9e2aa;
          color: #ad7413;
        }

        .scholarship-main > div:last-child {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .scholarship-label {
          color: #a19a8f;
          font-size: 9px;
        }

        .scholarship-main strong {
          color: #39455a;
          font-size: 11px;
          font-weight: 650;
        }

        .approved-status {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #4b9667;
          font-size: 9px;
          font-weight: 650;
        }

        .scholarship-amount {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          flex-shrink: 0;
        }

        .scholarship-amount span {
          color: #999fa8;
          font-size: 9px;
        }

        .scholarship-amount strong {
          color: #263247;
          font-size: 20px;
        }

        .disbursement-bar {
          margin-top: 17px;
        }

        .disbursement-header,
        .disbursement-footer {
          display: flex;
          justify-content: space-between;
          gap: 12px;
        }

        .disbursement-header {
          margin-bottom: 7px;
          color: #858d99;
          font-size: 9px;
        }

        .disbursement-header strong {
          color: #596273;
          font-size: 9px;
        }

        .progress-track {
          width: 100%;
          height: 7px;
          overflow: hidden;
          border-radius: 5px;
          background: #eee9df;
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
        }

        .gold-fill {
          background: linear-gradient(
            90deg,
            #e6a32d,
            #f0c260
          );
        }

        .purple-fill {
          background: linear-gradient(
            90deg,
            #8970b8,
            #aa91d4
          );
        }

        .disbursement-footer {
          margin-top: 7px;
          color: #999fa8;
          font-size: 9px;
        }

        .disbursement-footer strong {
          color: #667085;
        }

        .panel-link {
          margin-top: 15px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0;
          border: 0;
          background: transparent;
          color: #b27a19;
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
        }

        /* =====================================================
           ACADEMIC
           ===================================================== */

        .academic-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          align-items: center;
        }

        .academic-score {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .score-circle {
          width: 92px;
          height: 92px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background:
            radial-gradient(
              circle at center,
              #fffdf9 59%,
              transparent 60%
            ),
            conic-gradient(
              #75b78a 0deg 295deg,
              #edf0eb 295deg 360deg
            );
        }

        .score-circle > div {
          display: flex;
          align-items: baseline;
        }

        .score-circle strong {
          color: #304052;
          font-size: 23px;
        }

        .score-circle span {
          color: #7f8793;
          font-size: 11px;
        }

        .score-description {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .score-description strong {
          color: #384458;
          font-size: 12px;
        }

        .score-description > span {
          max-width: 150px;
          color: #9299a3;
          font-size: 9px;
          line-height: 1.45;
        }

        .score-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
          color: #ba811e;
          font-size: 8px;
          font-weight: 650;
        }

        .academic-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .academic-metric {
          min-width: 0;
          padding: 11px 9px;
          border-radius: 9px;
          background: #faf7f1;
          border: 1px solid #eee8de;
        }

        .academic-metric span {
          display: block;
          color: #969da7;
          font-size: 8px;
          line-height: 1.3;
        }

        .academic-metric strong {
          display: block;
          margin-top: 6px;
          color: #344054;
          font-size: 15px;
        }

        /* =====================================================
           TASKS
           ===================================================== */

        .tasks-list {
          display: flex;
          flex-direction: column;
        }

        .task-row {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px 0;
          border-bottom: 1px solid #eee9e1;
        }

        .task-row:first-child {
          padding-top: 0;
        }

        .task-row:last-child {
          padding-bottom: 0;
          border-bottom: 0;
        }

        .task-status-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 9px;
        }

        .task-status-icon.pending {
          background: #fff2dc;
          color: #cf8a1c;
        }

        .task-status-icon.in-progress {
          background: #edf4fc;
          color: #5682af;
        }

        .task-status-icon.completed {
          background: #ebf7ef;
          color: #4d9767;
        }

        .task-info {
          min-width: 0;
          flex: 1;
        }

        .task-title-row {
          display: flex;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
        }

        .task-title-row strong {
          color: #3a4558;
          font-size: 10px;
        }

        .task-info p {
          margin: 3px 0 5px;
          color: #969da7;
          font-size: 8px;
        }

        .priority {
          display: inline-flex;
          align-items: center;
          padding: 2px 5px;
          border-radius: 4px;
          font-size: 7px;
          font-weight: 700;
        }

        .priority.high {
          background: #fff0ed;
          color: #b85b4d;
        }

        .priority.medium {
          background: #fff6dc;
          color: #a67822;
        }

        .priority.low {
          background: #eef6f0;
          color: #548466;
        }

        .task-due {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #9ba1aa;
          font-size: 8px;
        }

        .task-right {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #b1b6be;
          flex-shrink: 0;
        }

        .task-status {
          display: inline-flex;
          align-items: center;
          min-height: 22px;
          padding: 0 7px;
          border-radius: 11px;
          font-size: 7px;
          font-weight: 700;
        }

        .task-status.pending {
          background: #fff4df;
          color: #b27a1b;
        }

        .task-status.in-progress {
          background: #edf4fb;
          color: #5a80a6;
        }

        .task-status.completed {
          background: #edf7f0;
          color: #4e8d64;
        }

        .empty-search {
          min-height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 6px;
          color: #9aa1aa;
        }

        .empty-search strong {
          color: #596273;
          font-size: 11px;
        }

        .empty-search span {
          font-size: 9px;
        }

        /* =====================================================
           PROGRAMME
           ===================================================== */

        .programme-progress {
          display: grid;
          grid-template-columns: 135px 1fr;
          gap: 15px;
          align-items: center;
        }

        .circular-progress {
          position: relative;
          width: 125px;
          height: 125px;
        }

        .progress-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .circle-bg,
        .circle-progress {
          fill: none;
          stroke-width: 8;
        }

        .circle-bg {
          stroke: #eee9df;
        }

        .circle-progress {
          stroke: #e5a32e;
          stroke-linecap: round;
        }

        .circular-value {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .circular-value strong {
          color: #364154;
          font-size: 22px;
        }

        .circular-value span {
          margin-top: 1px;
          color: #999fa8;
          font-size: 8px;
        }

        .programme-details {
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .programme-step {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .step-icon {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: #f1eee8;
          color: #a0a5ac;
        }

        .programme-step.completed .step-icon {
          background: #eaf6ed;
          color: #4e9665;
        }

        .programme-step.current .step-icon {
          background: #fff0cf;
          color: #c28a21;
        }

        .programme-step > div:last-child {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .programme-step strong {
          color: #4a5567;
          font-size: 9px;
        }

        .programme-step span {
          color: #9ca2ab;
          font-size: 8px;
        }

        /* =====================================================
           MENTOR
           ===================================================== */

        .mentor-profile {
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .mentor-avatar {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            #dce8ee,
            #c3d6df
          );
          color: #496271;
          font-size: 12px;
          font-weight: 700;
        }

        .mentor-info {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .mentor-info strong {
          color: #3b4659;
          font-size: 11px;
        }

        .mentor-info > span {
          color: #969da7;
          font-size: 8px;
        }

        .mentor-rating {
          display: flex;
          align-items: center;
          gap: 3px;
          color: #b9811c;
          font-size: 8px;
          font-weight: 650;
        }

        .mentor-next {
          margin-top: 15px;
          padding: 10px;
          display: flex;
          align-items: center;
          gap: 9px;
          border: 1px solid #eee7dd;
          border-radius: 9px;
          background: #fbf8f2;
        }

        .mentor-next-icon {
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #fff;
          color: #c48718;
        }

        .mentor-next > div:last-child {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .mentor-next span {
          color: #999fa8;
          font-size: 8px;
        }

        .mentor-next strong {
          color: #505b6c;
          font-size: 9px;
        }

        .mentor-button {
          width: 100%;
          height: 37px;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 1px solid #e4c67f;
          border-radius: 8px;
          background: #fffaf0;
          color: #a87516;
          font-size: 9px;
          font-weight: 650;
          cursor: pointer;
        }

        .mentor-button:hover {
          background: #fff4d9;
        }

        /* =====================================================
           CAREER
           ===================================================== */

        .career-top {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .career-icon {
          width: 39px;
          height: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: #f0ebfa;
          color: #8068b0;
        }

        .career-top h3 {
          margin-top: 2px;
        }

        .career-panel > p {
          margin: 13px 0;
          color: #8d949f;
          font-size: 9px;
          line-height: 1.55;
        }

        .career-progress > div:first-child {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .career-progress span {
          color: #999fa8;
          font-size: 8px;
        }

        .career-progress strong {
          color: #606a79;
          font-size: 8px;
        }

        .career-button {
          width: 100%;
          height: 36px;
          margin-top: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          border: 0;
          border-radius: 8px;
          background: #354157;
          color: #fff;
          font-size: 9px;
          font-weight: 650;
          cursor: pointer;
        }

        .career-button:hover {
          background: #293448;
        }

        /* =====================================================
           ACTIVITY
           ===================================================== */

        .activity-list {
          display: flex;
          flex-direction: column;
        }

        .activity-item {
          position: relative;
          display: flex;
          gap: 10px;
          padding: 0 0 15px;
        }

        .activity-item:last-child {
          padding-bottom: 0;
        }

        .activity-item:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 9px;
          left: 3px;
          bottom: 0;
          width: 1px;
          background: #ece6dc;
        }

        .activity-dot {
          position: relative;
          z-index: 2;
          width: 7px;
          height: 7px;
          margin-top: 4px;
          flex-shrink: 0;
          border-radius: 50%;
        }

        .activity-dot.success {
          background: #65a878;
        }

        .activity-dot.info {
          background: #7199bf;
        }

        .activity-dot.warning {
          background: #d59a2d;
        }

        .activity-content {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .activity-content strong {
          color: #485366;
          font-size: 9px;
        }

        .activity-content p {
          margin: 0;
          color: #979ea8;
          font-size: 8px;
          line-height: 1.45;
        }

        .activity-content span {
          margin-top: 1px;
          color: #b0b4ba;
          font-size: 7px;
        }

        /* =====================================================
           QUICK ACTIONS
           ===================================================== */

        .quick-section {
          margin-top: 23px;
        }

        .section-heading {
          margin-bottom: 11px;
        }

        .section-heading > div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .section-heading span {
          color: #b18a4b;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .section-heading h2 {
          margin: 0;
          color: #2c374a;
          font-size: 16px;
        }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 11px;
        }

        .quick-card {
          min-width: 0;
          min-height: 73px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          border: 1px solid #e9e2d7;
          border-radius: 11px;
          background: #fffdf9;
          color: #667085;
          text-align: left;
          cursor: pointer;
          transition:
            transform 160ms ease,
            box-shadow 160ms ease,
            border-color 160ms ease;
        }

        .quick-card:hover {
          transform: translateY(-2px);
          border-color: #e2d2b0;
          box-shadow: 0 8px 22px rgba(45, 49, 58, 0.055);
        }

        .quick-card-icon {
          width: 37px;
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 9px;
        }

        .quick-card > div:nth-child(2) {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .quick-card strong {
          color: #465164;
          font-size: 10px;
        }

        .quick-card span {
          overflow: hidden;
          color: #9ba1a9;
          font-size: 8px;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .quick-card > svg {
          flex-shrink: 0;
          color: #adb2b9;
        }

        /* =====================================================
           FOOTER
           ===================================================== */

        .student-footer {
          margin-top: 34px;
          padding-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-top: 1px solid #e8e1d7;
          color: #a0a5ad;
          font-size: 9px;
        }

        .student-footer > div {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .student-footer button {
          padding: 0;
          border: 0;
          background: transparent;
          color: #8e959f;
          font-size: 9px;
          cursor: pointer;
        }

        .student-footer button:hover {
          color: #b27a19;
        }

        /* =====================================================
           MOBILE OVERLAY
           ===================================================== */

        .sidebar-overlay {
          display: none;
        }

        /* =====================================================
           TABLET
           ===================================================== */

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-right {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            align-items: start;
          }

          .programme-panel {
            grid-row: span 2;
          }

          .quick-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* =====================================================
           TABLET / SMALL DESKTOP
           ===================================================== */

        @media (max-width: 950px) {
          .student-sidebar {
            width: 225px;
          }

          .student-main {
            width: calc(100% - 225px);
            margin-left: 225px;
          }

          .student-content {
            padding-left: 22px;
            padding-right: 22px;
          }

          .student-navbar {
            padding: 0 22px;
          }

          .search-box {
            width: 190px;
          }

          .profile-strip-meta {
            display: none;
          }

          .welcome-section {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        /* =====================================================
           MOBILE
           ===================================================== */

        @media (max-width: 800px) {
          .student-dashboard {
            display: block;
          }

          .student-sidebar {
            width: 270px;
            transform: translateX(-100%);
            transition: transform 220ms ease;
            box-shadow: 15px 0 45px rgba(32, 39, 51, 0.10);
          }

          .student-sidebar.open {
            transform: translateX(0);
          }

          .mobile-close {
            display: flex;
          }

          .sidebar-overlay {
            position: fixed;
            inset: 0;
            display: block;
            z-index: 40;
            border: 0;
            background: rgba(22, 28, 39, 0.28);
            backdrop-filter: blur(2px);
          }

          .student-main {
            width: 100%;
            margin-left: 0;
          }

          .student-navbar {
            min-height: 64px;
            padding: 0 16px;
          }

          .mobile-menu-button {
            display: flex;
          }

          .breadcrumb {
            font-size: 10px;
          }

          .navbar-right {
            gap: 8px;
          }

          .search-box {
            display: none;
          }

          .navbar-profile-info,
          .profile-chevron {
            display: none;
          }

          .student-content {
            padding: 23px 15px 30px;
          }

          .welcome-section {
            margin-bottom: 18px;
          }

          .welcome-section h1 {
            font-size: 25px;
          }

          .welcome-section p {
            font-size: 11px;
          }

          .welcome-actions {
            width: 100%;
          }

          .outline-action,
          .primary-action {
            flex: 1;
          }

          .outline-action span,
          .primary-action span {
            white-space: nowrap;
          }

          .profile-strip {
            align-items: flex-start;
          }

          .profile-strip-main {
            width: 100%;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 9px;
          }

          .stat-card {
            padding: 13px;
          }

          .stat-value {
            font-size: 21px;
          }

          .dashboard-right {
            display: flex;
          }

          .academic-body {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .programme-progress {
            grid-template-columns: 120px 1fr;
          }

          .quick-grid {
            grid-template-columns: 1fr;
          }

          .student-footer {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* =====================================================
           SMALL MOBILE
           ===================================================== */

        @media (max-width: 500px) {
          .student-content {
            padding-left: 12px;
            padding-right: 12px;
          }

          .welcome-actions {
            flex-direction: column;
          }

          .outline-action,
          .primary-action {
            width: 100%;
          }

          .profile-strip {
            padding: 14px;
          }

          .large-avatar {
            width: 54px;
            height: 54px;
            font-size: 15px;
          }

          .profile-name-row h2 {
            font-size: 14px;
          }

          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .stat-icon {
            width: 30px;
            height: 30px;
          }

          .stat-label {
            font-size: 8px;
          }

          .stat-value {
            font-size: 19px;
          }

          .panel {
            padding: 15px;
          }

          .scholarship-content {
            align-items: flex-start;
            flex-direction: column;
          }

          .scholarship-amount {
            align-items: flex-start;
            padding-left: 56px;
          }

          .academic-score {
            align-items: flex-start;
          }

          .academic-metrics {
            grid-template-columns: repeat(3, 1fr);
          }

          .task-right {
            display: none;
          }

          .programme-progress {
            grid-template-columns: 1fr;
            justify-items: center;
          }

          .programme-details {
            width: 100%;
          }

          .student-footer > div {
            flex-wrap: wrap;
            gap: 12px;
          }
        }
      `}</style>
        </div>
    );
}