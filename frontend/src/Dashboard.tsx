import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Milk,
  Thermometer,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
  Wallet,
  Package,
  Sparkles,
  Volume2,
  VolumeX,
  Languages,
  Plus,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Droplets,
  IndianRupee,
  Users,
  Calculator,
  Award,
  ArrowUpRight,
  Sprout,
  Menu,
  X,
  Home,
  Mic,
  MicOff,
  Send,
  Bot,
  User,
  ChevronRight,
  Zap,
  Server,
  Cpu,
  Code2,
  Copy,
  Check,
  Sun,
  Moon,
  Activity,
  FileText,
  RefreshCw,
  Search,
  Terminal,
  Database,
  Printer,
  Wifi,
  LogOut
} from 'lucide-react';
import { api } from './api';
import type { User as AuthUser } from './api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

// ==========================================
// CONCISE ENTERPRISE BILINGUAL DICTIONARY
// ==========================================
const TRANSLATIONS = {
  hi: {
    appName: 'GAUVAANI AMRIT',
    appSub: 'डेयरी साथी ERP',
    langToggle: 'EN',
    listenBtn: 'सुनें',
    stopBtn: 'रोकें',
    tabs: {
      home: 'ओवरव्यू व AI',
      lab: 'मिल्क लैब',
      charts: 'वित्तीय चार्ट',
      khata: 'लोन खाता',
      inventory: 'इन्वेंटरी',
      optimize: 'राशन AI',
      backend: 'Gemma API'
    },
    home: {
      heroTitle: 'गौवाणी AI कमांड सेंटर',
      micStart: 'वॉयस कमांड',
      micListening: 'सुन रहा हूँ...',
      inputPlaceholder: 'कमांड लिखें या बोलें (जैसे: "32°C पर शेल्फ-लाइफ", "मासिक मुनाफा")...',
      sendBtn: 'पूछें',
      quickVoiceTitle: 'त्वरित कमांड',
      liveSnapshot: 'सिस्टम मॉड्यूल'
    },
    kpis: {
      todayMilk: 'दैनिक दूध संकलन',
      avgGrade: 'गुणवत्ता व दर',
      monthlyProfit: 'मासिक शुद्ध लाभ',
      pendingLoans: 'बकाया उधार'
    },
    lab: {
      title: 'दूध गुणवत्ता व शेल्फ-लाइफ विश्लेषक',
      iotSimulateBtn: 'IoT सेंसर रीडिंग',
      iotSimulating: 'स्कैनिंग...',
      receiptBtn: 'डिजिटल पर्ची',
      farmerName: 'सप्लायर व आईडी',
      cattleType: 'पशु श्रेणी',
      cow: 'गाय',
      buffalo: 'भैंस',
      quantity: 'मात्रा (L)',
      fat: 'फैट (%)',
      snf: 'एसएनएफ (%)',
      ph: 'pH स्तर',
      temp: 'तापमान (°C)',
      targetHours: 'लक्ष्य स्टोरेज (घंटे)',
      clr: 'लैक्टोमीटर (CLR)',
      stripTests: 'रासायनिक मिलावट जांच',
      urea: 'यूरिया',
      starch: 'स्टार्च',
      detergent: 'डिटर्जेंट',
      neutralizer: 'न्यूट्रलाइज़र',
      peroxide: 'पेरोक्साइड',
      clean: 'शुद्ध',
      detected: 'मिलावट',
      saveBatchBtn: 'लेजर में सेव करें',
      savedSuccess: 'बैच सेव हो गया',
      decayChartTitle: 'थर्मल शेल्फ-लाइफ कर्व',
      results: {
        qualityTitle: 'ग्रेड और मूल्यांकन',
        gradeA: 'ग्रेड A+ (प्रीमियम)',
        gradeB: 'ग्रेड B (मानक)',
        gradeC: 'ग्रेड C (अस्वीकृत)',
        ratePerLiter: 'दर / लीटर',
        totalPayout: 'कुल भुगतान',
        shelfLifeTitle: 'शेल्फ-लाइफ और कूलिंग',
        safeFor: 'सुरक्षित समय',
        hours: 'घंटे',
        reqTemp: 'आवश्यक तापमान',
        coolingAction: 'तुरंत चिलिंग आवश्यक',
        tempSafe: 'तापमान अनुकूल है',
        boilAlert: 'खराब होने का जोखिम! तुरंत 4°C पर ठंडा करें',
        purityTitle: 'शुद्धता स्थिति',
        pureBadge: '100% शुद्ध प्रमाणित',
        waterAlert: 'पानी की मिलावट संदिग्ध (कम CLR)',
        chemAlert: 'रासायनिक मिलावट पाई गई!'
      },
      gemmaTitle: 'Gemma AI विश्लेषण',
      askGemmaBtn: 'Gemma विश्लेषण'
    },
    charts: {
      pnlTitle: 'आय और व्यय (P&L)',
      income: 'आय',
      expense: 'व्यय',
      netProfit: 'शुद्ध लाभ',
      loanChartTitle: 'लोन वसूली अनुपात',
      recovered: 'वसूल',
      pending: 'बकाया',
      txType: 'प्रकार',
      txIncome: 'आय (बिक्री)',
      txExpense: 'व्यय (खर्च)',
      txAmount: 'राशि (₹)',
      txNote: 'विवरण',
      addTxBtn: 'जोड़ें'
    },
    khata: {
      title: 'ग्राहक व किसान लोन खाता',
      searchPlaceholder: 'नाम खोजें...',
      addLoanBtn: 'नया लोन',
      colName: 'खाताधारक',
      colTotal: 'कुल लोन',
      colPaid: 'वसूल',
      colPending: 'बकाया',
      colProgress: 'प्रगति',
      colAction: 'किस्त कटौती',
      deductBtn: '₹500 काटें',
      settled: 'चुकता'
    },
    inventory: {
      title: 'चारा और स्टॉक प्रबंधन',
      daysLeft: 'दिन शेष',
      dailyUse: 'दैनिक खपत:',
      lowStock: 'कम स्टॉक',
      goodStock: 'पर्याप्त',
      restockBtn: '+50 स्टॉक',
      consumeBtn: '-1 दिन खपत'
    },
    optimize: {
      title: 'फार्म और राशन ऑप्टिमाइजेशन',
      cattleCount: 'दुधारू पशु',
      currentYield: 'दैनिक उत्पादन',
      chillingCap: 'कूलर क्षमता',
      planTitle: 'Gemma AI ऑप्टिमाइजेशन प्लान',
      feedOpt: 'संतुलित आहार फॉर्मूला',
      tempOpt: 'चिलिंग शेड्यूल',
      profitOpt: 'अनुमानित मासिक लाभ वृद्धि',
      generateAiPlanBtn: 'कस्टम AI प्लान बनाएं'
    },
    backend: {
      title: 'Gemma API और FastAPI सर्वर कंसोल',
      modelLabel: 'AI मॉडल',
      testEndpointBtn: 'API टेस्ट करें',
      copyCodeBtn: 'कोड कॉपी करें',
      copiedBtn: 'कॉपी हो गया'
    }
  },
  en: {
    appName: 'GAUVAANI AMRIT',
    appSub: 'Dairy Sathi ERP',
    langToggle: 'HI',
    listenBtn: 'Listen',
    stopBtn: 'Stop',
    tabs: {
      home: 'Overview & AI',
      lab: 'Milk Lab',
      charts: 'Financials',
      khata: 'Loan Khata',
      inventory: 'Inventory',
      optimize: 'Yield AI',
      backend: 'Gemma API'
    },
    home: {
      heroTitle: 'Gauvaani AI Command Center',
      micStart: 'Voice Command',
      micListening: 'Listening...',
      inputPlaceholder: 'Ask AI or run a command (e.g., "Shelf-life at 32°C", "Monthly P&L")...',
      sendBtn: 'Send',
      quickVoiceTitle: 'Quick Actions',
      liveSnapshot: 'System Modules'
    },
    kpis: {
      todayMilk: 'Daily Milk Pool',
      avgGrade: 'Quality & Rate',
      monthlyProfit: 'Monthly Net Profit',
      pendingLoans: 'Active Credit'
    },
    lab: {
      title: 'Milk Quality & Shelf-Life Analyzer',
      iotSimulateBtn: 'Read IoT Probe',
      iotSimulating: 'Scanning...',
      receiptBtn: 'Batch Receipt',
      farmerName: 'Supplier & ID',
      cattleType: 'Cattle Type',
      cow: 'Cow',
      buffalo: 'Buffalo',
      quantity: 'Volume (L)',
      fat: 'Fat (%)',
      snf: 'SNF (%)',
      ph: 'pH Level',
      temp: 'Temperature (°C)',
      targetHours: 'Target Storage (Hrs)',
      clr: 'Lactometer (CLR)',
      stripTests: 'Rapid Adulteration Strip Tests',
      urea: 'Urea',
      starch: 'Starch',
      detergent: 'Detergent',
      neutralizer: 'Neutralizer',
      peroxide: 'Peroxide',
      clean: 'Pure',
      detected: 'Positive',
      saveBatchBtn: 'Record Batch',
      savedSuccess: 'Batch Recorded',
      decayChartTitle: 'Thermal Shelf-Life Curve',
      results: {
        qualityTitle: 'Grading & Valuation',
        gradeA: 'Grade A+ (Premium)',
        gradeB: 'Grade B (Standard)',
        gradeC: 'Grade C (Reject)',
        ratePerLiter: 'Rate / Liter',
        totalPayout: 'Net Payout',
        shelfLifeTitle: 'Shelf-Life & Thermal Status',
        safeFor: 'Safe Window',
        hours: 'Hrs',
        reqTemp: 'Target Chilling',
        coolingAction: 'Immediate Chilling Required',
        tempSafe: 'Temperature Optimal',
        boilAlert: 'Spoilage Risk! Chill to 4°C Immediately',
        purityTitle: 'Purity Verification',
        pureBadge: '100% Pure Verified',
        waterAlert: 'Suspected Water Dilution (Low CLR)',
        chemAlert: 'Chemical Adulteration Detected!'
      },
      gemmaTitle: 'Gemma AI Advisory',
      askGemmaBtn: 'Run Gemma Analysis'
    },
    charts: {
      pnlTitle: 'Revenue & Expense (P&L)',
      income: 'Revenue',
      expense: 'Expense',
      netProfit: 'Net Profit',
      loanChartTitle: 'Credit Recovery',
      recovered: 'Recovered',
      pending: 'Pending',
      txType: 'Type',
      txIncome: 'Revenue (Sales)',
      txExpense: 'Expense (Payout/Feed)',
      txAmount: 'Amount (₹)',
      txNote: 'Reference',
      addTxBtn: 'Log Entry'
    },
    khata: {
      title: 'Farmer & Buyer Credit Ledger',
      searchPlaceholder: 'Filter accounts...',
      addLoanBtn: 'New Credit',
      colName: 'Account',
      colTotal: 'Principal',
      colPaid: 'Recovered',
      colPending: 'Balance',
      colProgress: 'Recovery',
      colAction: 'EMI Action',
      deductBtn: 'Deduct ₹500',
      settled: 'Settled'
    },
    inventory: {
      title: 'Fodder & Stock Control',
      daysLeft: 'd left',
      dailyUse: 'Burn rate:',
      lowStock: 'Reorder Needed',
      goodStock: 'Optimal',
      restockBtn: '+50 Units',
      consumeBtn: '-1d Usage'
    },
    optimize: {
      title: 'Herd & Chilling Optimization',
      cattleCount: 'Active Herd',
      currentYield: 'Daily Output',
      chillingCap: 'Cooler Capacity',
      planTitle: 'Gemma AI Optimization Blueprint',
      feedOpt: 'Ration Formulation',
      tempOpt: 'Thermal Efficiency',
      profitOpt: 'Projected Monthly Gain',
      generateAiPlanBtn: 'Generate AI Blueprint'
    },
    backend: {
      title: 'Gemma API & FastAPI Console',
      modelLabel: 'Inference Model',
      testEndpointBtn: 'Test Endpoint',
      copyCodeBtn: 'Copy FastAPI Code',
      copiedBtn: 'Copied'
    }
  }
};

// ==========================================
// INITIAL REALISTIC INDIAN DAIRY DATA
// ==========================================
const INITIAL_PNL_DATA = [
  { month: 'Jun', income: 142000, expense: 98000, profit: 44000 },
  { month: 'Jul', income: 155000, expense: 104000, profit: 51000 },
  { month: 'Aug', income: 168000, expense: 112000, profit: 56000 },
  { month: 'Sep', income: 161000, expense: 108000, profit: 53000 },
  { month: 'Oct', income: 184000, expense: 119000, profit: 65000 },
  { month: 'Nov', income: 196000, expense: 121000, profit: 75000 }
];

const INITIAL_LOANS = [
  {
    id: 1,
    nameHi: 'रामेश्वर यादव (#104)',
    nameEn: 'Rameshwar Yadav (#104)',
    purposeHi: 'पशु आहार एडवांस',
    purposeEn: 'Cattle Feed Advance',
    totalLoan: 25000,
    recovered: 16500,
    dailyEmi: 500
  },
  {
    id: 2,
    nameHi: 'सुनीता देवी (#112)',
    nameEn: 'Sunita Devi (#112)',
    purposeHi: 'मिनरल मिक्चर व बीज',
    purposeEn: 'Mineral Mix Credit',
    totalLoan: 12000,
    recovered: 9500,
    dailyEmi: 500
  },
  {
    id: 3,
    nameHi: 'प्रयाग डेयरी (थोक)',
    nameEn: 'Prayag Dairy (Bulk)',
    purposeHi: 'साप्ताहिक पनीर बिल',
    purposeEn: 'Weekly Bulk Credit',
    totalLoan: 40000,
    recovered: 28000,
    dailyEmi: 500
  },
  {
    id: 4,
    nameHi: 'महेश पटेल (#119)',
    nameEn: 'Mahesh Patel (#119)',
    purposeHi: 'पशु चिकित्सा एडवांस',
    purposeEn: 'Vet Care Advance',
    totalLoan: 18000,
    recovered: 8000,
    dailyEmi: 500
  }
];

const INITIAL_INVENTORY = [
  {
    id: 'green_fodder',
    nameHi: 'हरा चारा (नेपियर)',
    nameEn: 'Green Fodder (Napier)',
    stock: 420,
    unitHi: 'kg',
    unitEn: 'kg',
    dailyBurn: 120,
    category: 'fodder'
  },
  {
    id: 'dry_fodder',
    nameHi: 'सूखा चारा (भूसा)',
    nameEn: 'Dry Fodder (Straw)',
    stock: 850,
    unitHi: 'kg',
    unitEn: 'kg',
    dailyBurn: 70,
    category: 'fodder'
  },
  {
    id: 'concentrate',
    nameHi: 'संतुलित पशु आहार (खल)',
    nameEn: 'Bypass Protein Feed',
    stock: 160,
    unitHi: 'kg',
    unitEn: 'kg',
    dailyBurn: 45,
    category: 'feed'
  },
  {
    id: 'mineral_mix',
    nameHi: 'चीलेटेड मिनरल मिक्चर',
    nameEn: 'Chelated Mineral Mix',
    stock: 28,
    unitHi: 'kg',
    unitEn: 'kg',
    dailyBurn: 2,
    category: 'supplement'
  },
  {
    id: 'test_strips',
    nameHi: 'मिलावट जांच स्ट्रिप्स',
    nameEn: 'Adulteration Test Strips',
    stock: 35,
    unitHi: 'pcs',
    unitEn: 'pcs',
    dailyBurn: 10,
    category: 'lab'
  }
];

const VOICE_DEMO_COMMANDS = [
  {
    id: 'cmd_batch_update',
    labelHi: 'बैच 75L और फैट 6.8% करें',
    labelEn: 'Set Batch 75L & Fat 6.8%',
    queryHi: 'दूध का बैच 45L से बदलकर 75L करो और फैट 6.8% सेट करो',
    queryEn: 'Change 45L of batch to 75L and set fat to 6.8%'
  },
  {
    id: 'cmd_shelf',
    labelHi: 'शेल्फ-लाइफ @ 32°C',
    labelEn: 'Shelf-Life @ 32°C',
    queryHi: 'अभी दूध का तापमान 32 डिग्री है, यह कितने घंटे सुरक्षित रहेगा और इसे कितने डिग्री पर ठंडा करें?',
    queryEn: 'Current milk temperature is 32 degrees Celsius, how many hours is it safe and what temperature should I chill it to?'
  },
  {
    id: 'cmd_quality',
    labelHi: 'गुणवत्ता व मूल्य',
    labelEn: 'Quality & Valuation',
    queryHi: 'आज के दूध की गुणवत्ता ग्रेड, फैट, एसएनएफ और प्रति लीटर उचित दाम क्या है?',
    queryEn: 'What is today milk quality grade, fat, SNF and fair payout rate per liter?'
  },
  {
    id: 'cmd_pnl',
    labelHi: 'मासिक P&L सारांश',
    labelEn: 'Monthly P&L',
    queryHi: 'इस महीने हमारी डेयरी की कुल आमदनी, खर्च और शुद्ध मुनाफा कितना है?',
    queryEn: 'What is our dairy total revenue, expense and net profit this month?'
  },
  {
    id: 'cmd_loan',
    labelHi: 'रामेश्वर EMI कटौती',
    labelEn: 'Deduct ₹500 EMI',
    queryHi: 'रामेश्वर यादव के लोन खाते से आज के दूध बिल से 500 रुपये की किस्त काट लो और बकाया बताओ।',
    queryEn: 'Deduct 500 rupees EMI from Rameshwar Yadav loan account and tell me the remaining balance.'
  },
  {
    id: 'cmd_stock',
    labelHi: 'कम स्टॉक जांच',
    labelEn: 'Low Stock Check',
    queryHi: 'स्टॉक चेक करो और बताओ कौन सा चारा या सामान 5 दिन से कम बचा है?',
    queryEn: 'Check inventory and tell me which fodder or stock item has less than 5 days left?'
  }
];

// ==========================================
// COMPLETE PYTHON FASTAPI + GEMMA BACKEND CODE
// ==========================================
const FASTAPI_BACKEND_CODE = `# backend/main.py  (run: uvicorn main:app --reload --port 8000)
#
# Endpoints
#   POST /api/auth/register      create account, returns JWT
#   POST /api/auth/login         returns JWT
#   GET  /api/auth/me            current user
#   GET  /api/data               all of this user's saved data
#   PUT  /api/data/{key}         save pnlData | loans | inventory | farm | settings
#   POST /api/batches            save a milk batch to this user's ledger
#   GET  /api/batches            list this user's saved batches
#   POST /api/ai/generate        Gemma proxy (API key stays on the server)
#   GET  /api/health             status + configured models
#
# Secrets live in backend/.env (GEMMA_API_KEY, JWT_SECRET) - never in the browser.
`;

// Debounced save of one piece of per-user data to the backend
function usePersist(key: string, value: unknown, ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const h = setTimeout(() => {
      api.saveData(key, value).catch(() => {});
    }, 600);
    return () => clearTimeout(h);
  }, [key, value, ready]);
}

export default function Dashboard({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  // Theme, Navigation & Voice State
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState<'hi' | 'en'>(() => {
    try { return (localStorage.getItem('ga_lang') as 'hi' | 'en') || 'en'; } catch { return 'en'; }
  });
  const [activeTab, setActiveTab] = useState('home');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [batchSavedToast, setBatchSavedToast] = useState(false);

  // Gemma Backend Engine State
  const [selectedModel, setSelectedModel] = useState('gemma-3-27b-it');
  const [customApiKey, setCustomApiKey] = useState('');
  const [apiLatency, setApiLatency] = useState(134);
  const [isCallingGemma, setIsCallingGemma] = useState(false);
  const [liveGemmaPoints, setLiveGemmaPoints] = useState<string[] | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [apiLogs, setApiLogs] = useState([
    {
      id: 'log-1',
      time: '10:14:22',
      endpoint: 'POST /api/v1/gemma/milk-advisory',
      model: 'gemma-2-9b-it',
      status: '200 OK',
      latency: '134ms',
      summary: 'Batch #104: Grade A+ (₹56.2/L) • Safe Window 14.5h'
    },
    {
      id: 'log-2',
      time: '10:12:05',
      endpoint: 'POST /api/v1/iot/sensor-telemetry',
      model: 'ESP32-Probe',
      status: '200 OK',
      latency: '38ms',
      summary: 'Temp: 24.0°C | pH: 6.62 | CLR: 28.5'
    }
  ]);

  // Voice & AI Assistant State
  const [isListening, setIsListening] = useState(false);
  const [aiInput, setAiInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      textHi:
        'गौवाणी AI तैयार है। दूध की जांच, तापमान शेल्फ-लाइफ, P&L या लोन खाते के लिए कमांड दें।',
      textEn:
        'Gauvaani AI ready. Issue a voice or text command to inspect milk quality, shelf-life, P&L, or credit accounts.',
      actionBadgeHi: 'Gemma 2 AI सक्रिय',
      actionBadgeEn: 'Gemma 2 AI Ready',
      targetTab: null as string | null
    }
  ]);
  const recognitionRef = useRef<any>(null);

  // Tab 1: Milk Lab & IoT Sensor Parameters
  const [farmerName, setFarmerName] = useState('Rameshwar Yadav (#104)');
  const [cattleType, setCattleType] = useState('buffalo');
  const [milkQty, setMilkQty] = useState(45);
  const [fat, setFat] = useState(6.2);
  const [snf, setSnf] = useState(8.8);
  const [ph, setPh] = useState(6.62);
  const [temp, setTemp] = useState(24);
  const [targetHours, setTargetHours] = useState(18);
  const [clr, setClr] = useState(28.5);
  const [strips, setStrips] = useState({
    urea: false,
    starch: false,
    detergent: false,
    neutralizer: false,
    peroxide: false
  });
  const [isSimulatingIot, setIsSimulatingIot] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // Tab 2 & 3: Business P&L & Customer Loans State
  const [pnlData, setPnlData] = useState(INITIAL_PNL_DATA);
  const [newTxType, setNewTxType] = useState('income');
  const [newTxAmount, setNewTxAmount] = useState(12500);
  const [newTxNote, setNewTxNote] = useState('');
  const [loans, setLoans] = useState(INITIAL_LOANS);
  const [loanSearch, setLoanSearch] = useState('');
  const [newLoanName, setNewLoanName] = useState('');
  const [newLoanAmount, setNewLoanAmount] = useState(10000);

  // Tab 4: Smart Inventory State
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);

  // Tab 5: Farm Optimization State
  const [cattleCount, setCattleCount] = useState(15);
  const [dailyYield, setDailyYield] = useState(165);
  const [chillingCap, setChillingCap] = useState(250);
  const [powerCost] = useState(6500);
  const [customOptAdvice, setCustomOptAdvice] = useState<string | null>(null);

  // ==========================================
  // PER-USER DATA: LOAD FROM + SAVE TO BACKEND
  // ==========================================
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let alive = true;
    api
      .getData()
      .then((d) => {
        if (!alive) return;
        if (Array.isArray(d.pnlData) && d.pnlData.length) setPnlData(d.pnlData);
        if (Array.isArray(d.loans)) setLoans(d.loans);
        if (Array.isArray(d.inventory)) setInventory(d.inventory);
        if (d.farm) {
          if (typeof d.farm.cattleCount === 'number') setCattleCount(d.farm.cattleCount);
          if (typeof d.farm.dailyYield === 'number') setDailyYield(d.farm.dailyYield);
          if (typeof d.farm.chillingCap === 'number') setChillingCap(d.farm.chillingCap);
        }
        if (d.settings) {
          if (typeof d.settings.darkMode === 'boolean') setDarkMode(d.settings.darkMode);
          if (d.settings.lang === 'hi' || d.settings.lang === 'en') setLang(d.settings.lang);
          if (typeof d.settings.autoSpeak === 'boolean') setAutoSpeak(d.settings.autoSpeak);
        }
        setDataLoaded(true);
      })
      .catch(() => {
        // Do NOT enable saving if loading failed - we could overwrite real data with defaults
        if (alive) setLoadError(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  const farmSettings = useMemo(() => ({ cattleCount, dailyYield, chillingCap }), [cattleCount, dailyYield, chillingCap]);
  const uiSettings = useMemo(() => ({ darkMode, lang, autoSpeak }), [darkMode, lang, autoSpeak]);
  usePersist('pnlData', pnlData, dataLoaded);
  usePersist('loans', loans, dataLoaded);
  usePersist('inventory', inventory, dataLoaded);
  usePersist('farm', farmSettings, dataLoaded);
  usePersist('settings', uiSettings, dataLoaded);
  useEffect(() => {
    try { localStorage.setItem('ga_lang', lang); } catch { /* ignore */ }
  }, [lang]);

  const t = TRANSLATIONS[lang];

  // ==========================================
  // AI & SCIENTIFIC DAIRY CALCULATIONS
  // ==========================================
  const milkAnalysis = useMemo(() => {
    const hasChemicalAdulteration =
      strips.urea ||
      strips.starch ||
      strips.detergent ||
      strips.neutralizer ||
      strips.peroxide;

    const expectedSnf = clr / 4 + 0.21 * fat + 0.36;
    const isWaterDiluted = clr < 25 || snf < 7.8 || Math.abs(expectedSnf - snf) > 1.35;
    const isAcidityAbnormal = ph < 6.45 || ph > 6.85;

    let grade = 'A+';
    let gradeLabel = t.lab.results.gradeA;
    let gradeColor = 'emerald';

    if (hasChemicalAdulteration || ph < 6.3 || ph > 7.0) {
      grade = 'C';
      gradeLabel = t.lab.results.gradeC;
      gradeColor = 'red';
    } else if (isWaterDiluted || isAcidityAbnormal || fat < 3.8 || snf < 8.2) {
      grade = 'B';
      gradeLabel = t.lab.results.gradeB;
      gradeColor = 'amber';
    }

    let ratePerLiter = 0;
    if (grade === 'C') {
      ratePerLiter = 22;
    } else {
      const baseRate = fat * 4.8 + snf * 2.6;
      const gradeBonus = grade === 'A+' ? 4.5 : 0;
      ratePerLiter = Math.round((baseRate + gradeBonus) * 10) / 10;
    }
    const totalPayout = Math.round(ratePerLiter * milkQty);

    let pHFactor = 1.0;
    if (ph < 6.5 || ph > 6.75) pHFactor = 0.65;
    if (ph < 6.4 || ph > 6.85) pHFactor = 0.3;

    const rawSafeHours = 72 * Math.pow(0.55, (temp - 4) / 6.5) * pHFactor;
    const predictedSafeHours = Math.max(1, Math.min(72, Math.round(rawSafeHours * 10) / 10));

    let requiredTemp = 4;
    if (targetHours <= 4 && pHFactor >= 0.8) {
      requiredTemp = 25;
    } else if (targetHours <= 8 && pHFactor >= 0.8) {
      requiredTemp = 15;
    } else if (targetHours <= 14 && pHFactor >= 0.8) {
      requiredTemp = 10;
    } else if (targetHours <= 24) {
      requiredTemp = 6;
    } else {
      requiredTemp = 4;
    }

    const needsImmediateCooling = temp > requiredTemp || predictedSafeHours < targetHours;

    const decayCurveData = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map((tempPoint) => {
      const hrs = Math.max(
        1,
        Math.min(72, Math.round(72 * Math.pow(0.55, (tempPoint - 4) / 6.5) * pHFactor * 10) / 10)
      );
      return {
        tempLabel: `${tempPoint}°C`,
        tempValue: tempPoint,
        safeHours: hrs,
        targetLine: targetHours
      };
    });

    let purityStatus = 'PURE';
    let purityMessage = t.lab.results.pureBadge;
    if (hasChemicalAdulteration) {
      purityStatus = 'CHEMICAL';
      purityMessage = t.lab.results.chemAlert;
    } else if (isWaterDiluted) {
      purityStatus = 'WATER';
      purityMessage = t.lab.results.waterAlert;
    }

    const detectedChemsHi = [
      strips.urea && 'यूरिया',
      strips.starch && 'स्टार्च',
      strips.detergent && 'डिटर्जेंट',
      strips.neutralizer && 'न्यूट्रलाइज़र',
      strips.peroxide && 'पेरोक्साइड'
    ]
      .filter(Boolean)
      .join(', ');

    const detectedChemsEn = [
      strips.urea && 'Urea',
      strips.starch && 'Starch',
      strips.detergent && 'Detergent',
      strips.neutralizer && 'Neutralizers',
      strips.peroxide && 'Peroxide'
    ]
      .filter(Boolean)
      .join(', ');

    const gemmaPointsHi = [
      `मूल्यांकन: ग्रेड '${grade}' | फैट ${fat}%, SNF ${snf}% | दर ₹${ratePerLiter}/L (कुल ₹${totalPayout.toLocaleString('en-IN')})।`,
      `शेल्फ-लाइफ: ${temp}°C पर ${predictedSafeHours} घंटे सुरक्षित। ${targetHours} घंटे स्टोरेज हेतु ${requiredTemp}°C पर ठंडा करें।`,
      purityStatus === 'PURE'
        ? `शुद्धता: CLR ${clr} और 5-स्ट्रिप जांच में 100% शुद्ध।`
        : purityStatus === 'WATER'
        ? `मिलावट अलर्ट: कम CLR (${clr}) — लगभग ${Math.max(5, Math.round((28 - clr) * 3))}% पानी संदिग्ध।`
        : `गंभीर अलर्ट: रासायनिक तत्व (${detectedChemsHi}) पाए गए। बैच अलग करें।`,
      `राशन सुझाव: 50g चीलेटेड मिनरल मिक्चर दें, SNF +0.3% और दर +₹2.5/L बढ़ेगी।`
    ];

    const gemmaPointsEn = [
      `Valuation: Grade '${grade}' | Fat ${fat}%, SNF ${snf}% | Fair Rate ₹${ratePerLiter}/L (Total ₹${totalPayout.toLocaleString('en-IN')}).`,
      `Thermal Control: Safe for ${predictedSafeHours}h at ${temp}°C. Chill to ${requiredTemp}°C for ${targetHours}h target.`,
      purityStatus === 'PURE'
        ? `Purity: CLR (${clr}) and 5-parameter strip test verified 100% pure.`
        : purityStatus === 'WATER'
        ? `Dilution Alert: Low CLR (${clr}) indicates ~${Math.max(5, Math.round((28 - clr) * 3))}% water addition.`
        : `Critical Alert: Adulterants (${detectedChemsEn}) detected. Quarantine batch immediately.`,
      `Ration Tip: Add 50g chelated mineral mix + bypass protein to boost SNF by +0.3%.`
    ];

    return {
      grade,
      gradeLabel,
      gradeColor,
      ratePerLiter,
      totalPayout,
      predictedSafeHours,
      requiredTemp,
      needsImmediateCooling,
      purityStatus,
      purityMessage,
      decayCurveData,
      gemmaAdvice: liveGemmaPoints || (lang === 'hi' ? gemmaPointsHi : gemmaPointsEn)
    };
  }, [fat, snf, ph, temp, targetHours, clr, strips, milkQty, lang, t, liveGemmaPoints]);

  useEffect(() => {
    setLiveGemmaPoints(null);
  }, [fat, snf, ph, temp, targetHours, clr, strips, lang]);

  // ==========================================
  // BUSINESS, LOAN & INVENTORY AGGREGATIONS
  // ==========================================
  const loanSummary = useMemo(() => {
    const totalLoan = loans.reduce((acc, item) => acc + item.totalLoan, 0);
    const totalRecovered = loans.reduce((acc, item) => acc + item.recovered, 0);
    const totalPending = Math.max(0, totalLoan - totalRecovered);
    return {
      totalLoan,
      totalRecovered,
      totalPending,
      pieData: [
        {
          name: t.charts.recovered,
          value: totalRecovered,
          color: '#10b981'
        },
        {
          name: t.charts.pending,
          value: totalPending,
          color: '#f59e0b'
        }
      ]
    };
  }, [loans, t]);

  const filteredLoans = useMemo(() => {
    if (!loanSearch.trim()) return loans;
    const q = loanSearch.toLowerCase();
    return loans.filter(
      (l) =>
        l.nameHi.toLowerCase().includes(q) ||
        l.nameEn.toLowerCase().includes(q) ||
        l.purposeHi.toLowerCase().includes(q) ||
        l.purposeEn.toLowerCase().includes(q)
    );
  }, [loans, loanSearch]);

  const lowStockItems = useMemo(() => {
    return inventory.filter((item) => item.stock / item.dailyBurn < 5);
  }, [inventory]);

  const latestMonthPnl = pnlData[pnlData.length - 1];

  // ==========================================
  // TEXT-TO-SPEECH (TTS) ENGINE
  // ==========================================
  const speakText = (textToSpeak: string, forceLang?: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    const targetLang = forceLang || (lang === 'hi' ? 'hi-IN' : 'en-IN');
    utterance.lang = targetLang;
    utterance.rate = 0.98;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSpeakAdvisory = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    speakText(milkAnalysis.gemmaAdvice.join(' '));
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // ==========================================
  // LIVE GEMMA API BACKEND CALLER
  // ==========================================
  const handleRunLiveGemmaAnalysis = async () => {
    setIsCallingGemma(true);
    const startTime = performance.now();

    const prompt = `Act as 'Gauvaani Amrit ERP' powered by Google Gemma (${selectedModel}).
Analyze this milk batch:
- Supplier: ${farmerName} (${cattleType})
- Volume: ${milkQty}L | Fat: ${fat}% | SNF: ${snf}% | CLR: ${clr} | pH: ${ph}
- Temp: ${temp}°C | Target Storage: ${targetHours}h
- Grade: ${milkAnalysis.grade} | Rate: ₹${milkAnalysis.ratePerLiter}/L | Safe Window: ${milkAnalysis.predictedSafeHours}h
- Purity: ${milkAnalysis.purityStatus}

Return exactly 4 concise, executive bullet points in ${
      lang === 'hi' ? 'Hindi (Devanagari)' : 'English'
    } covering:
1) Grade & payout valuation
2) Chilling temperature & shelf-life window
3) Purity & adulteration status
4) Ration optimization tip.`;

    try {
      const result = await api.ai({ prompt, model: selectedModel });

      const elapsed = Math.round(performance.now() - startTime);
      setApiLatency(elapsed);

      {
        const rawText = result.text || '';
        const lines = rawText
          .split('\n')
          .map((l: string) => l.replace(/^[-*•\d.)\s]+/, '').trim())
          .filter((l: string) => l.length > 12)
          .slice(0, 4);

        if (lines.length >= 2) {
          setLiveGemmaPoints(lines);
          if (autoSpeak) speakText(lines.join('. '));
        }
      }

      setApiLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour12: false }),
          endpoint: `POST /v1beta/models/${selectedModel}:generateContent`,
          model: selectedModel,
          status: '200 OK',
          latency: `${elapsed}ms`,
          summary: `Batch Grade ${milkAnalysis.grade}, Temp ${temp}°C (${milkAnalysis.predictedSafeHours}h safe)`
        },
        ...prev.slice(0, 7)
      ]);
    } catch (_err) {
      const elapsed = Math.round(performance.now() - startTime);
      setApiLatency(elapsed || 110);
      setApiLogs((prev) => [
        {
          id: `log-${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour12: false }),
          endpoint: `POST /api/v1/gemma/edge-fallback`,
          model: `${selectedModel}`,
          status: '200 OK',
          latency: '42ms',
          summary: `Edge Advisory -> Grade ${milkAnalysis.grade} (₹${milkAnalysis.ratePerLiter}/L)`
        },
        ...prev.slice(0, 7)
      ]);
    } finally {
      setIsCallingGemma(false);
    }
  };

  // ==========================================
  // SIMULATE LIVE IOT HARDWARE MILK SENSOR PROBE
  // ==========================================
  const handleSimulateIotProbe = () => {
    setIsSimulatingIot(true);
    setTimeout(() => {
      const isBuff = Math.random() > 0.35;
      const simFat = isBuff
        ? Number((5.8 + Math.random() * 1.4).toFixed(1))
        : Number((3.9 + Math.random() * 0.9).toFixed(1));
      const simSnf = isBuff
        ? Number((8.7 + Math.random() * 0.6).toFixed(1))
        : Number((8.3 + Math.random() * 0.5).toFixed(1));
      const simClr = Number((27.0 + Math.random() * 2.5).toFixed(1));
      const simPh = Number((6.56 + Math.random() * 0.14).toFixed(2));
      const simTemp = Math.round(18 + Math.random() * 13);

      setCattleType(isBuff ? 'buffalo' : 'cow');
      setFat(simFat);
      setSnf(simSnf);
      setClr(simClr);
      setPh(simPh);
      setTemp(simTemp);
      setStrips({
        urea: false,
        starch: false,
        detergent: false,
        neutralizer: false,
        peroxide: false
      });
      setIsSimulatingIot(false);

      setApiLogs((prev) => [
        {
          id: `iot-${Date.now()}`,
          time: new Date().toLocaleTimeString([], { hour12: false }),
          endpoint: 'MQTT /iot/esp32-probe/telemetry',
          model: 'ESP32-Sensor',
          status: '200 OK',
          latency: '29ms',
          summary: `Fat: ${simFat}%, SNF: ${simSnf}%, Temp: ${simTemp}°C, pH: ${simPh}`
        },
        ...prev.slice(0, 7)
      ]);
    }, 500);
  };

  // ==========================================
  // CENTRAL AI VOICE & COMMAND PROCESSOR
  // ==========================================
  const processAiCommand = async (rawQuery: string) => {
    const query = (rawQuery || '').trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      textHi: query,
      textEn: query,
      actionBadgeHi: '',
      actionBadgeEn: '',
      targetTab: null
    };
    setChatMessages((prev) => [userMsg, ...prev]);
    setAiInput('');
    setIsAiThinking(true);

    const startTime = performance.now();
    const lower = query.toLowerCase();

    // Helper to extract the target number when a user says "change X to Y" or "X से Y करो"
    const extractTargetValue = (patterns: RegExp[]): number | null => {
      for (const regex of patterns) {
        const matches = Array.from(lower.matchAll(regex));
        if (matches.length > 0) {
          const lastMatch = matches[matches.length - 1];
          const val = parseFloat(lastMatch[1]);
          if (!Number.isNaN(val)) return val;
        }
      }
      return null;
    };

    // Track live state mutations synchronously so responses never use stale React state
    let nextQty = milkQty;
    let nextFat = fat;
    let nextSnf = snf;
    let nextTemp = temp;
    let nextPh = ph;
    let nextClr = clr;
    let nextTargetHours = targetHours;
    let nextCattle = cattleType;
    const appliedChangesHi: string[] = [];
    const appliedChangesEn: string[] = [];

    // 1. Detect Milk Batch Quantity (Liters) e.g. "45l of batch to 75l", "set batch to 75L", "75 लीटर"
    const hasQtyContext =
      /(?:batch|qty|quantity|volume|milk|liter|liters|litre|litres|मात्रा|लीटर|बैच|\d+\s*l\b)/i.test(
        lower
      );
    if (hasQtyContext) {
      const parsedQty = extractTargetValue([
        /(?:to|से|बदलकर|करो|set)\s*(\d+(?:\.\d+)?)\s*(?:l|liter|liters|litre|litres|लीटर)\b/gi,
        /\b(\d+(?:\.\d+)?)\s*(?:l|liter|liters|litre|litres|लीटर)\b/gi,
        /(?:batch|quantity|qty|volume|मात्रा|बैच).*?(?:to|से|बदलकर|=|is|हैं|करो)\s*(\d+(?:\.\d+)?)/gi,
        /(?:batch|quantity|qty|volume|मात्रा|बैच)\s*(?:of\s*)?(\d+(?:\.\d+)?)/gi
      ]);
      if (parsedQty !== null && parsedQty >= 1 && parsedQty <= 2000) {
        nextQty = Math.round(parsedQty * 10) / 10;
        setMilkQty(nextQty);
        appliedChangesHi.push(`मात्रा: ${nextQty}L`);
        appliedChangesEn.push(`Volume: ${nextQty}L`);
      }
    }

    // 2. Detect Fat % changes e.g. "fat 6.2 to 6.8%", "set fat 6.8", "फैट 6.8"
    if (/(?:fat|फैट)/i.test(lower)) {
      const parsedFat = extractTargetValue([
        /(?:fat|फैट).*?(?:to|से|बदलकर|=)\s*(\d+(?:\.\d+)?)/gi,
        /(?:fat|फैट)\s*(?:is|at|को|पर)?\s*(\d+(?:\.\d+)?)/gi,
        /(\d+(?:\.\d+)?)\s*%?\s*(?:fat|फैट)/gi
      ]);
      if (parsedFat !== null && parsedFat >= 1.5 && parsedFat <= 12) {
        nextFat = Math.round(parsedFat * 10) / 10;
        setFat(nextFat);
        appliedChangesHi.push(`फैट: ${nextFat}%`);
        appliedChangesEn.push(`Fat: ${nextFat}%`);
      }
    }

    // 3. Detect SNF % changes e.g. "snf to 9.1", "एसएनएफ 9.0"
    if (/(?:snf|एसएनएफ)/i.test(lower)) {
      const parsedSnf = extractTargetValue([
        /(?:snf|एसएनएफ).*?(?:to|से|बदलकर|=)\s*(\d+(?:\.\d+)?)/gi,
        /(?:snf|एसएनएफ)\s*(?:is|at|को|पर)?\s*(\d+(?:\.\d+)?)/gi,
        /(\d+(?:\.\d+)?)\s*%?\s*(?:snf|एसएनएफ)/gi
      ]);
      if (parsedSnf !== null && parsedSnf >= 5 && parsedSnf <= 13) {
        nextSnf = Math.round(parsedSnf * 10) / 10;
        setSnf(nextSnf);
        appliedChangesHi.push(`SNF: ${nextSnf}%`);
        appliedChangesEn.push(`SNF: ${nextSnf}%`);
      }
    }

    // 4. Detect Temperature (°C) changes e.g. "temp 24 to 32", "32°C", "32 डिग्री"
    if (/(?:temp|temperature|डिग्री|degree|°c|तापमान)/i.test(lower)) {
      const parsedTemp = extractTargetValue([
        /(?:temp|temperature|तापमान).*?(?:to|से|बदलकर|=)\s*(\d+(?:\.\d+)?)/gi,
        /(\d+(?:\.\d+)?)\s*(?:डिग्री|degree|degrees|°c)\b/gi,
        /(?:temp|temperature|तापमान)\s*(?:is|at|को|पर)?\s*(\d+(?:\.\d+)?)/gi
      ]);
      if (parsedTemp !== null && parsedTemp >= 1 && parsedTemp <= 50) {
        nextTemp = Math.round(parsedTemp * 10) / 10;
        setTemp(nextTemp);
        appliedChangesHi.push(`तापमान: ${nextTemp}°C`);
        appliedChangesEn.push(`Temp: ${nextTemp}°C`);
      }
    }

    // 5. Detect pH changes e.g. "pH to 6.5"
    if (/(?:\bph\b|पीएच)/i.test(lower)) {
      const parsedPh = extractTargetValue([
        /(?:\bph\b|पीएच).*?(?:to|से|बदलकर|=)\s*(\d+(?:\.\d+)?)/gi,
        /(?:\bph\b|पीएच)\s*(?:level|is|at|को)?\s*(\d+(?:\.\d+)?)/gi
      ]);
      if (parsedPh !== null && parsedPh >= 4.0 && parsedPh <= 9.0) {
        nextPh = Math.round(parsedPh * 100) / 100;
        setPh(nextPh);
        appliedChangesHi.push(`pH: ${nextPh}`);
        appliedChangesEn.push(`pH: ${nextPh}`);
      }
    }

    // 6. Detect CLR (Lactometer) changes e.g. "clr to 29"
    if (/(?:\bclr\b|lactometer|लैक्टोमीटर)/i.test(lower)) {
      const parsedClr = extractTargetValue([
        /(?:\bclr\b|lactometer|लैक्टोमीटर).*?(?:to|से|बदलकर|=)\s*(\d+(?:\.\d+)?)/gi,
        /(?:\bclr\b|lactometer|लैक्टोमीटर)\s*(?:is|at|को)?\s*(\d+(?:\.\d+)?)/gi,
        /(\d+(?:\.\d+)?)\s*\bclr\b/gi
      ]);
      if (parsedClr !== null && parsedClr >= 15 && parsedClr <= 40) {
        nextClr = Math.round(parsedClr * 10) / 10;
        setClr(nextClr);
        appliedChangesHi.push(`CLR: ${nextClr}`);
        appliedChangesEn.push(`CLR: ${nextClr}`);
      }
    }

    // 7. Detect Target Storage Hours e.g. "target 24 hours", "24 घंटे"
    if (/(?:target|storage|hours|hrs|घंटे)/i.test(lower)) {
      const parsedHrs = extractTargetValue([
        /(\d+)\s*(?:hours|hour|hrs|hr|घंटे)/gi,
        /(?:target|storage).*?(\d+)/gi
      ]);
      if (parsedHrs !== null && parsedHrs >= 2 && parsedHrs <= 72) {
        nextTargetHours = Math.round(parsedHrs);
        setTargetHours(nextTargetHours);
        appliedChangesHi.push(`लक्ष्य: ${nextTargetHours}h`);
        appliedChangesEn.push(`Target: ${nextTargetHours}h`);
      }
    }

    // 8. Detect Cattle Type switch (Cow / Buffalo)
    if (/\b(?:cow|गाय)\b/i.test(lower)) {
      nextCattle = 'cow';
      setCattleType('cow');
      appliedChangesHi.push('पशु: गाय');
      appliedChangesEn.push('Cattle: Cow');
    } else if (/\b(?:buffalo|भैंस)\b/i.test(lower)) {
      nextCattle = 'buffalo';
      setCattleType('buffalo');
      appliedChangesHi.push('पशु: भैंस');
      appliedChangesEn.push('Cattle: Buffalo');
    }

    // Recompute live dairy metrics immediately using the updated parameters
    const hasChem =
      strips.urea || strips.starch || strips.detergent || strips.neutralizer || strips.peroxide;
    const expectedSnf = nextClr / 4 + 0.21 * nextFat + 0.36;
    const isWater = nextClr < 25 || nextSnf < 7.8 || Math.abs(expectedSnf - nextSnf) > 1.35;
    const isAcid = nextPh < 6.45 || nextPh > 6.85;

    let liveGrade = 'A+';
    if (hasChem || nextPh < 6.3 || nextPh > 7.0) {
      liveGrade = 'C';
    } else if (isWater || isAcid || nextFat < 3.8 || nextSnf < 8.2) {
      liveGrade = 'B';
    }

    const liveRate =
      liveGrade === 'C'
        ? 22
        : Math.round((nextFat * 4.8 + nextSnf * 2.6 + (liveGrade === 'A+' ? 4.5 : 0)) * 10) / 10;
    const livePayout = Math.round(liveRate * nextQty);
    const phFac = nextPh < 6.4 || nextPh > 6.85 ? 0.3 : nextPh < 6.5 || nextPh > 6.75 ? 0.65 : 1.0;
    const liveSafeHrs = Math.max(
      1,
      Math.min(72, Math.round(72 * Math.pow(0.55, (nextTemp - 4) / 6.5) * phFac * 10) / 10)
    );
    const liveReqTemp =
      nextTargetHours <= 4 && phFac >= 0.8
        ? 25
        : nextTargetHours <= 8 && phFac >= 0.8
        ? 15
        : nextTargetHours <= 14 && phFac >= 0.8
        ? 10
        : nextTargetHours <= 24
        ? 6
        : 4;

    let localResponseHi = '';
    let localResponseEn = '';
    let actionBadgeHi = '';
    let actionBadgeEn = '';
    let targetTab: string | null = null;

    // If any milk lab parameters were updated by the command, confirm immediately with new totals!
    if (appliedChangesEn.length > 0) {
      localResponseHi = `अपडेट पूर्ण (${appliedChangesHi.join(', ')})। नया मूल्यांकन: बैच ${nextQty}L, ग्रेड '${liveGrade}', दर ₹${liveRate}/L, कुल भुगतान ₹${livePayout.toLocaleString('en-IN')}। ${nextTemp}°C पर सुरक्षित समय ${liveSafeHrs} घंटे है (${nextTargetHours}h स्टोरेज हेतु ${liveReqTemp}°C पर ठंडा करें)।`;
      localResponseEn = `Updated (${appliedChangesEn.join(', ')}). New Valuation: ${nextQty}L Batch, Grade '${liveGrade}', Rate ₹${liveRate}/L, Net Payout ₹${livePayout.toLocaleString('en-IN')}. Safe window at ${nextTemp}°C is ${liveSafeHrs}h (Chill to ${liveReqTemp}°C for ${nextTargetHours}h target).`;
      actionBadgeHi = `अपडेट लागू: ${appliedChangesHi.join(' • ')}`;
      actionBadgeEn = `Updated: ${appliedChangesEn.join(' • ')}`;
      targetTab = 'lab';
    } else if (
      lower.includes('सेव') ||
      lower.includes('दर्ज') ||
      lower.includes('save batch') ||
      lower.includes('record batch')
    ) {
      handleSaveMilkBatch();
      localResponseHi = `${nextQty}L का दूध बैच (कुल भुगतान ₹${livePayout.toLocaleString('en-IN')}) सफलतापूर्वक वित्तीय लेजर में दर्ज कर दिया गया है।`;
      localResponseEn = `${nextQty}L milk batch (Net payout ₹${livePayout.toLocaleString('en-IN')}) has been recorded in the financial ledger.`;
      actionBadgeHi = `बैच सेव: ${nextQty}L (₹${livePayout.toLocaleString('en-IN')})`;
      actionBadgeEn = `Batch Saved: ${nextQty}L (₹${livePayout.toLocaleString('en-IN')})`;
      targetTab = 'charts';
    } else if (
      lower.includes('तापमान') ||
      lower.includes('शेल्फ') ||
      lower.includes('shelf') ||
      lower.includes('temp') ||
      lower.includes('ठंडा') ||
      lower.includes('chill')
    ) {
      localResponseHi = `${nextTemp}°C पर सुरक्षित समय ${liveSafeHrs} घंटे है। ${nextTargetHours} घंटे के लक्ष्य हेतु ${liveReqTemp}°C पर ठंडा करें।`;
      localResponseEn = `At ${nextTemp}°C, safe shelf-life is ${liveSafeHrs} hours. Chill to ${liveReqTemp}°C to meet your ${nextTargetHours}-hour target.`;
      actionBadgeHi = `तापमान ${nextTemp}°C • ${liveSafeHrs}h सुरक्षित`;
      actionBadgeEn = `Temp ${nextTemp}°C • ${liveSafeHrs}h Safe`;
      targetTab = 'lab';
    } else if (
      lower.includes('लोन') ||
      lower.includes('उधार') ||
      lower.includes('किस्त') ||
      lower.includes('रामेश्वर') ||
      lower.includes('loan') ||
      lower.includes('emi') ||
      lower.includes('khata') ||
      lower.includes('rameshwar')
    ) {
      if (
        lower.includes('काट') ||
        lower.includes('deduct') ||
        lower.includes('किस्त') ||
        lower.includes('emi')
      ) {
        const deductAmt = extractTargetValue([/(?:₹|rs\.?|रुपये)?\s*(\d+)/gi]) || 500;
        setLoans((prev) =>
          prev.map((l, idx) =>
            idx === 0 ? { ...l, recovered: Math.min(l.totalLoan, l.recovered + deductAmt) } : l
          )
        );
        const rameshwarPending = Math.max(0, loans[0].totalLoan - (loans[0].recovered + deductAmt));
        localResponseHi = `रामेश्वर यादव के खाते से ₹${deductAmt} किस्त काट ली गई है। शेष बकाया: ₹${rameshwarPending.toLocaleString('en-IN')}।`;
        localResponseEn = `₹${deductAmt} EMI deducted from Rameshwar Yadav. Remaining balance: ₹${rameshwarPending.toLocaleString('en-IN')}.`;
        actionBadgeHi = `₹${deductAmt} EMI कटौती पूर्ण`;
        actionBadgeEn = `₹${deductAmt} EMI Deducted`;
      } else {
        localResponseHi = `कुल ${loans.length} खातों में ₹${loanSummary.totalRecovered.toLocaleString('en-IN')} वसूल और ₹${loanSummary.totalPending.toLocaleString('en-IN')} बकाया है।`;
        localResponseEn = `Across ${loans.length} accounts, ₹${loanSummary.totalRecovered.toLocaleString('en-IN')} recovered and ₹${loanSummary.totalPending.toLocaleString('en-IN')} pending.`;
        actionBadgeHi = 'लोन सारांश';
        actionBadgeEn = 'Credit Summary';
      }
      targetTab = 'khata';
    } else if (
      lower.includes('मुनाफा') ||
      lower.includes('नुकसान') ||
      lower.includes('आमदनी') ||
      lower.includes('खर्च') ||
      lower.includes('profit') ||
      lower.includes('loss') ||
      lower.includes('income') ||
      lower.includes('chart')
    ) {
      localResponseHi = `${latestMonthPnl.month}: कुल आय ₹${latestMonthPnl.income.toLocaleString('en-IN')}, व्यय ₹${latestMonthPnl.expense.toLocaleString('en-IN')}, और शुद्ध लाभ ₹${latestMonthPnl.profit.toLocaleString('en-IN')}।`;
      localResponseEn = `${latestMonthPnl.month}: Revenue ₹${latestMonthPnl.income.toLocaleString('en-IN')}, Expense ₹${latestMonthPnl.expense.toLocaleString('en-IN')}, Net Profit ₹${latestMonthPnl.profit.toLocaleString('en-IN')}.`;
      actionBadgeHi = 'P&L विश्लेषण';
      actionBadgeEn = 'P&L Analytics';
      targetTab = 'charts';
    } else if (
      lower.includes('चारा') ||
      lower.includes('स्टॉक') ||
      lower.includes('इन्वेंटरी') ||
      lower.includes('stock') ||
      lower.includes('inventory') ||
      lower.includes('fodder')
    ) {
      const lowNamesHi = lowStockItems.map((i) => i.nameHi).join(', ');
      const lowNamesEn = lowStockItems.map((i) => i.nameEn).join(', ');
      localResponseHi = `${lowStockItems.length} आइटम कम स्टॉक (< 5 दिन) में हैं: ${lowNamesHi || 'कोई नहीं'}।`;
      localResponseEn = `${lowStockItems.length} items below 5-day threshold: ${lowNamesEn || 'None'}.`;
      actionBadgeHi = `${lowStockItems.length} स्टॉक अलर्ट`;
      actionBadgeEn = `${lowStockItems.length} Low Stock Alerts`;
      targetTab = 'inventory';
    } else if (
      lower.includes('मिलावट') ||
      lower.includes('यूरिया') ||
      lower.includes('शुद्ध') ||
      lower.includes('लैक्टोमीटर') ||
      lower.includes('adulteration') ||
      lower.includes('pure') ||
      lower.includes('urea') ||
      lower.includes('clr')
    ) {
      localResponseHi = `CLR ${nextClr}, pH ${nextPh} — ${milkAnalysis.purityMessage}।`;
      localResponseEn = `CLR ${nextClr}, pH ${nextPh} — ${milkAnalysis.purityMessage}.`;
      actionBadgeHi = 'शुद्धता जांच';
      actionBadgeEn = 'Purity Verified';
      targetTab = 'lab';
    } else if (
      lower.includes('जांच') ||
      lower.includes('गुणवत्ता') ||
      lower.includes('फैट') ||
      lower.includes('रेट') ||
      lower.includes('दाम') ||
      lower.includes('quality') ||
      lower.includes('grade') ||
      lower.includes('fat') ||
      lower.includes('price')
    ) {
      localResponseHi = `बैच (${nextQty}L, फैट ${nextFat}%, SNF ${nextSnf}%): ग्रेड '${liveGrade}', दर ₹${liveRate}/L, कुल ₹${livePayout.toLocaleString('en-IN')}।`;
      localResponseEn = `Batch (${nextQty}L, Fat ${nextFat}%, SNF ${nextSnf}%): Grade '${liveGrade}', Rate ₹${liveRate}/L, Total ₹${livePayout.toLocaleString('en-IN')}.`;
      actionBadgeHi = `ग्रेड ${liveGrade} • ₹${liveRate}/L`;
      actionBadgeEn = `Grade ${liveGrade} • ₹${liveRate}/L`;
      targetTab = 'lab';
    }

    // Structured JSON AI Fallback for complex natural language queries or mutations
    if (!localResponseHi) {
      try {
        const systemPrompt = `You are 'Gauvaani Amrit ERP' (${selectedModel}), an intelligent dairy ERP controller.
Current State: milkQty=${nextQty}L, fat=${nextFat}%, snf=${nextSnf}%, ph=${nextPh}, temp=${nextTemp}°C, clr=${nextClr}, targetHours=${nextTargetHours}h, cattleType=${nextCattle}, Grade=${liveGrade}, Rate=₹${liveRate}/L, Payout=₹${livePayout}.
If the user asks to change or update any parameter (like milk quantity, fat, snf, temp, ph, clr, targetHours), include the new numeric values in the JSON 'updates' object and confirm the change in 'replyHi' and 'replyEn'.`;

        const jsonShape = `Return JSON with this shape: {"replyHi": string (Hindi), "replyEn": string (English), "actionBadge": string, "targetTab": one of "home"|"lab"|"charts"|"khata"|"inventory"|"optimize"|"backend" or empty string, "updates": {"milkQty"?: number, "fat"?: number, "snf"?: number, "temp"?: number, "ph"?: number, "clr"?: number, "targetHours"?: number}}. Only include fields in "updates" that the user asked to change.`;
        const aiData = await api.ai({ prompt: query, system: `${systemPrompt}\n${jsonShape}`, model: selectedModel, json: true });

        {
          const parsed = aiData.json;
          if (parsed && typeof parsed.replyEn === 'string') {
            if (parsed.updates) {
              if (typeof parsed.updates.milkQty === 'number') setMilkQty(parsed.updates.milkQty);
              if (typeof parsed.updates.fat === 'number') setFat(parsed.updates.fat);
              if (typeof parsed.updates.snf === 'number') setSnf(parsed.updates.snf);
              if (typeof parsed.updates.temp === 'number') setTemp(parsed.updates.temp);
              if (typeof parsed.updates.ph === 'number') setPh(parsed.updates.ph);
              if (typeof parsed.updates.clr === 'number') setClr(parsed.updates.clr);
              if (typeof parsed.updates.targetHours === 'number')
                setTargetHours(parsed.updates.targetHours);
            }
            localResponseHi = parsed.replyHi;
            localResponseEn = parsed.replyEn;
            actionBadgeHi = parsed.actionBadge || `${selectedModel}`;
            actionBadgeEn = parsed.actionBadge || `${selectedModel}`;
            if (parsed.targetTab) targetTab = parsed.targetTab;
          }
        }
      } catch (_err) {
        // Offline deterministic fallback
      }
    }

    if (!localResponseHi) {
      localResponseHi = `सारांश: बैच ${nextQty}L, ग्रेड '${liveGrade}' (₹${liveRate}/L, कुल ₹${livePayout.toLocaleString('en-IN')}), ${nextTemp}°C पर ${liveSafeHrs}h सुरक्षित।`;
      localResponseEn = `Summary: ${nextQty}L Batch, Grade '${liveGrade}' (₹${liveRate}/L, Total ₹${livePayout.toLocaleString('en-IN')}), safe for ${liveSafeHrs}h at ${nextTemp}°C.`;
      actionBadgeHi = 'सिस्टम सारांश';
      actionBadgeEn = 'System Summary';
    }

    const elapsed = Math.round(performance.now() - startTime);
    setApiLatency(elapsed || 108);
    setApiLogs((prev) => [
      {
        id: `voice-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour12: false }),
        endpoint: 'POST /api/v1/gemma/command',
        model: selectedModel,
        status: '200 OK',
        latency: `${elapsed || 108}ms`,
        summary: `Query: "${query.slice(0, 32)}..." -> ${actionBadgeEn || 'OK'}`
      },
      ...prev.slice(0, 7)
    ]);

    const aiReply = {
      id: `ai-${Date.now()}`,
      role: 'assistant',
      textHi: localResponseHi,
      textEn: localResponseEn,
      actionBadgeHi,
      actionBadgeEn,
      targetTab
    };

    setChatMessages((prev) => [aiReply, ...prev]);
    setIsAiThinking(false);

    if (autoSpeak) {
      speakText(lang === 'hi' ? localResponseHi : localResponseEn);
    }
  };

  // ==========================================
  // SPEECH-TO-TEXT (MICROPHONE VOICE COMMANDS)
  // ==========================================
  const handleVoiceMicToggle = () => {
    const SpeechRecognition =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SpeechRecognition) {
      processAiCommand(
        lang === 'hi'
          ? 'आज के दूध की गुणवत्ता ग्रेड और शेल्फ-लाइफ बताओ'
          : 'Check milk quality grade and shelf life'
      );
      return;
    }

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setAiInput(transcript);
          processAiCommand(transcript);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (_e) {
      setIsListening(false);
    }
  };

  // ==========================================
  // INTERACTIVE MODULE HANDLERS
  // ==========================================
  const toggleStrip = (key: keyof typeof strips) => {
    setStrips((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveMilkBatch = () => {
    api
      .saveBatch({
        farmerName, cattleType, milkQty, fat, snf, clr, ph, temp, targetHours,
        grade: milkAnalysis.grade,
        ratePerLiter: milkAnalysis.ratePerLiter,
        totalPayout: milkAnalysis.totalPayout,
        purity: milkAnalysis.purityStatus,
        strips
      })
      .catch(() => {});
    setPnlData((prev) => {
      const updated = [...prev];
      const lastIdx = updated.length - 1;
      const addedRevenue = Math.round(milkAnalysis.totalPayout * 1.24);
      updated[lastIdx] = {
        ...updated[lastIdx],
        income: updated[lastIdx].income + addedRevenue,
        expense: updated[lastIdx].expense + milkAnalysis.totalPayout,
        profit:
          updated[lastIdx].income +
          addedRevenue -
          (updated[lastIdx].expense + milkAnalysis.totalPayout)
      };
      return updated;
    });
    setBatchSavedToast(true);
    setTimeout(() => setBatchSavedToast(false), 3000);
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(newTxAmount) || 0;
    if (amount <= 0) return;

    setPnlData((prev) => {
      const updated = [...prev];
      const lastIdx = updated.length - 1;
      const current = updated[lastIdx];
      const updatedIncome = newTxType === 'income' ? current.income + amount : current.income;
      const updatedExpense = newTxType === 'expense' ? current.expense + amount : current.expense;
      updated[lastIdx] = {
        ...current,
        income: updatedIncome,
        expense: updatedExpense,
        profit: updatedIncome - updatedExpense
      };
      return updated;
    });
    setNewTxNote('');
  };

  const handleDeductEmi = (id: number) => {
    setLoans((prev) =>
      prev.map((loan) => {
        if (loan.id !== id) return loan;
        const newRecovered = Math.min(loan.totalLoan, loan.recovered + 500);
        return { ...loan, recovered: newRecovered };
      })
    );
  };

  const handleAddNewLoan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLoanName.trim() || Number(newLoanAmount) <= 0) return;
    const newEntry = {
      id: Date.now(),
      nameHi: `${newLoanName}`,
      nameEn: `${newLoanName}`,
      purposeHi: 'डेयरी एडवांस',
      purposeEn: 'Dairy Credit',
      totalLoan: Number(newLoanAmount),
      recovered: 0,
      dailyEmi: 500
    };
    setLoans((prev) => [newEntry, ...prev]);
    setNewLoanName('');
  };

  const handleInventoryChange = (id: string, delta: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return { ...item, stock: Math.max(0, item.stock + delta) };
      })
    );
  };

  const handleGenerateCustomRationAi = async () => {
    setIsCallingGemma(true);
    try {
      const prompt = `Act as a Dairy Nutritionist powered by Gemma (${selectedModel}).
Provide a concise 3-point ration and chilling optimization plan in ${
        lang === 'hi' ? 'Hindi' : 'English'
      } for ${cattleCount} cattle producing ${dailyYield} L/day with a ${chillingCap}L cooler.`;

      const data = await api.ai({ prompt, model: selectedModel });

      {
        const text = data.text;
        if (text) {
          setCustomOptAdvice(text);
          if (autoSpeak) speakText(text);
        }
      }
    } catch (_e) {
      // Fallback handled by default UI
    } finally {
      setIsCallingGemma(false);
    }
  };

  const handleCopyBackendCode = () => {
    navigator.clipboard.writeText(FASTAPI_BACKEND_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const navItems = [
    { id: 'home', label: t.tabs.home, icon: Home, badge: 'AI' },
    { id: 'lab', label: t.tabs.lab, icon: Milk, badge: milkAnalysis.grade },
    { id: 'charts', label: t.tabs.charts, icon: TrendingUp, badge: `₹${(latestMonthPnl.profit / 1000).toFixed(0)}k` },
    { id: 'khata', label: t.tabs.khata, icon: Wallet, badge: `${loans.length}` },
    { id: 'inventory', label: t.tabs.inventory, icon: Package, badge: lowStockItems.length > 0 ? `${lowStockItems.length}!` : 'OK' },
    { id: 'optimize', label: t.tabs.optimize, icon: Sparkles, badge: 'Plan' },
    { id: 'backend', label: t.tabs.backend, icon: Server, badge: `${apiLatency}ms` }
  ];

  // Clean Executive Theme Tokens
  const bgMain = darkMode ? 'bg-[#090D16] text-slate-100' : 'bg-[#F8FAFC] text-slate-900';
  const cardBg = darkMode
    ? 'bg-[#111827] border-slate-800/90 text-slate-100'
    : 'bg-white border-slate-200/90 text-slate-900';
  const subCardBg = darkMode
    ? 'bg-slate-900/90 border-slate-800 text-slate-200'
    : 'bg-slate-50/90 border-slate-200/80 text-slate-800';
  const mutedText = darkMode ? 'text-slate-400' : 'text-slate-500';

  if (loadError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-[#090D16] text-slate-200 p-6 text-center">
        <p className="font-semibold">Could not load your data.</p>
        <p className="text-sm text-slate-400">Saving is paused so nothing gets overwritten. Check the server and try again.</p>
        <div className="flex gap-2">
          <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold cursor-pointer">Retry</button>
          <button onClick={onLogout} className="px-4 py-2 rounded-lg border border-slate-700 text-sm font-semibold cursor-pointer">Sign out</button>
        </div>
      </div>
    );
  }
  if (!dataLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-[#090D16] text-emerald-400 text-sm">Loading your dairy…</div>;
  }

  return (
    <div className={`min-h-screen ${bgMain} font-sans pb-14 transition-colors duration-200 selection:bg-emerald-500 selection:text-slate-950`}>
      {/* ==========================================
          DIGITAL MILK COLLECTION RECEIPT MODAL
      ========================================== */}
      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Milk className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">GAUVAANI AMRIT ERP</h3>
                  <p className="text-[11px] text-slate-500">Batch Settlement Receipt</p>
                </div>
              </div>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-2 text-xs border-b border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt ID:</span>
                <span className="font-mono font-semibold">#GA-{milkQty}9 • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Supplier:</span>
                <span className="font-semibold">{farmerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category & Volume:</span>
                <span className="font-semibold uppercase">
                  {cattleType} • {milkQty} L
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-center">
                  <div className="text-[10px] text-slate-500">FAT / SNF</div>
                  <div className="font-bold text-xs text-slate-900">
                    {fat}% / {snf}%
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-center">
                  <div className="text-[10px] text-slate-500">CLR / pH</div>
                  <div className="font-bold text-xs text-slate-900">
                    {clr} / {ph}
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-center">
                  <div className="text-[10px] text-slate-500">TEMP / SAFE</div>
                  <div className="font-bold text-xs text-sky-700">
                    {temp}°C / {milkAnalysis.predictedSafeHours}h
                  </div>
                </div>
              </div>
            </div>

            <div className="py-4 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Quality Grade:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  Grade {milkAnalysis.grade} ({milkAnalysis.purityStatus})
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Unit Rate:</span>
                <span className="font-bold text-slate-900">₹{milkAnalysis.ratePerLiter} / L</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-900">Net Payable:</span>
                <span className="text-lg font-black text-emerald-600">
                  ₹{milkAnalysis.totalPayout.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
              <button
                onClick={() => {
                  handleSaveMilkBatch();
                  setShowReceiptModal(false);
                }}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save to Ledger</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          SLIDE-OVER NAVIGATION DRAWER
      ========================================== */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsDrawerOpen(false)}
          />
          <div
            className={`relative w-72 max-w-[80vw] h-full shadow-2xl border-r flex flex-col justify-between z-10 p-4 ${
              darkMode ? 'bg-[#0F172A] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                    <Milk className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{t.appName}</span>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-800/50 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsDrawerOpen(false);
                      }}
                      className={`w-full px-3 py-2.5 rounded-lg text-left transition-all flex items-center justify-between cursor-pointer text-xs font-semibold ${
                        isActive
                          ? 'bg-emerald-600 text-white'
                          : darkMode
                          ? 'text-slate-300 hover:bg-slate-800/70'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          isActive
                            ? 'bg-emerald-800 text-emerald-100'
                            : darkMode
                            ? 'bg-slate-800 text-slate-400'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`pt-3 border-t text-[11px] flex items-center justify-between ${darkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {selectedModel}
              </span>
              <span className="font-mono">{apiLatency}ms</span>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          SINGLE SLEEK ENTERPRISE HEADER
      ========================================== */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
          darkMode ? 'bg-[#090D16]/90 border-slate-800/90' : 'bg-white/95 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          {/* Left: Menu + Brand + Inline Navigation */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setIsDrawerOpen(true)}
                aria-label="Toggle Menu"
                className={`p-2 rounded-lg border lg:hidden cursor-pointer ${
                  darkMode
                    ? 'bg-slate-900 border-slate-800 text-slate-200'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <Menu className="w-4 h-4" />
              </button>

              <div
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black">
                  <Milk className="w-4 h-4" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-black tracking-tight">{t.appName}</span>
                  <span className={`text-[11px] font-medium hidden sm:inline ${mutedText}`}>
                    {t.appSub}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Inline Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1 ml-2">
              {navItems.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? darkMode
                          ? 'bg-slate-800 text-white shadow-2xs'
                          : 'bg-slate-900 text-white'
                        : darkMode
                        ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : ''}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Compact Action Controls */}
          <div className="flex items-center gap-2">
            {/* Signed-in user + logout */}
            <div className={`hidden md:flex flex-col items-end leading-tight mr-1 ${mutedText}`}>
              <span className="text-[11px] font-semibold">{user.business_name || user.name}</span>
              <span className="text-[10px] font-mono">{user.email}</span>
            </div>
            <button
              onClick={onLogout}
              aria-label="Sign out"
              title="Sign out"
              className={`p-2 rounded-lg border cursor-pointer ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* API Status Pill */}
            <button
              onClick={() => setActiveTab('backend')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono border cursor-pointer ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-emerald-700'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{selectedModel}</span>
            </button>

            {/* Voice Trigger */}
            <button
              onClick={() => {
                setActiveTab('home');
                handleVoiceMicToggle();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                isListening
                  ? 'bg-red-600 text-white border-red-500 animate-pulse'
                  : darkMode
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span className="hidden md:inline">
                {isListening ? t.home.micListening : t.home.micStart}
              </span>
            </button>

            {/* TTS Mute Toggle */}
            <button
              onClick={() => {
                if (isSpeaking && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
                setAutoSpeak((prev) => !prev);
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                autoSpeak
                  ? darkMode
                    ? 'bg-slate-900 text-emerald-400 border-slate-800'
                    : 'bg-slate-100 text-slate-800 border-slate-200'
                  : darkMode
                  ? 'bg-slate-900 text-slate-600 border-slate-800'
                  : 'bg-slate-50 text-slate-400 border-slate-200'
              }`}
              title="Toggle Voice Output"
            >
              {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode((prev) => !prev)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Switch */}
            <button
              onClick={() => {
                if (isSpeaking && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
                setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                darkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                  : 'bg-slate-900 border-slate-900 text-white'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.langToggle}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          EXECUTIVE KPI STRIP
      ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div
            onClick={() => setActiveTab('lab')}
            className={`${cardBg} rounded-xl p-4 border hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between`}
          >
            <div>
              <p className={`text-[11px] font-semibold ${mutedText} uppercase tracking-wider`}>
                {t.kpis.todayMilk}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-xl font-bold">{dailyYield + milkQty} L</p>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> 12%
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => setActiveTab('lab')}
            className={`${cardBg} rounded-xl p-4 border hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between`}
          >
            <div>
              <p className={`text-[11px] font-semibold ${mutedText} uppercase tracking-wider`}>
                {t.kpis.avgGrade}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-xl font-bold text-emerald-400">
                  {milkAnalysis.grade}
                </p>
                <span className={`text-xs font-mono ${mutedText}`}>
                  ₹{milkAnalysis.ratePerLiter}/L
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => setActiveTab('charts')}
            className={`${cardBg} rounded-xl p-4 border hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between`}
          >
            <div>
              <p className={`text-[11px] font-semibold ${mutedText} uppercase tracking-wider`}>
                {t.kpis.monthlyProfit}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-xl font-bold">
                  ₹{latestMonthPnl.profit.toLocaleString('en-IN')}
                </p>
                <span className={`text-[11px] ${mutedText}`}>{latestMonthPnl.month}</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => setActiveTab('khata')}
            className={`${cardBg} rounded-xl p-4 border hover:border-slate-700 transition-all cursor-pointer flex items-center justify-between`}
          >
            <div>
              <p className={`text-[11px] font-semibold ${mutedText} uppercase tracking-wider`}>
                {t.kpis.pendingLoans}
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-xl font-bold text-amber-400">
                  ₹{loanSummary.totalPending.toLocaleString('en-IN')}
                </p>
                <span className={`text-[11px] ${mutedText}`}>{loans.length} accts</span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================
          MAIN MODULE VIEWPORT
      ========================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-5">
        {/* ==========================================
            TAB 0: OVERVIEW & AI COMMAND CENTER
        ========================================== */}
        {activeTab === 'home' && (
          <div className="space-y-5">
            <div className={`${cardBg} rounded-xl border overflow-hidden shadow-xs`}>
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold">{t.home.heroTitle}</h2>
                    </div>
                  </div>

                  <button
                    onClick={handleVoiceMicToggle}
                    className={`px-4 py-2 rounded-lg font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer border ${
                      isListening
                        ? 'bg-red-600 text-white border-red-500 animate-pulse'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500'
                    }`}
                  >
                    {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span>{isListening ? t.home.micListening : t.home.micStart}</span>
                  </button>
                </div>

                {/* Command Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    processAiCommand(aiInput);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    placeholder={t.home.inputPlaceholder}
                    className={`flex-1 px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm focus:outline-none focus:border-emerald-500 ${
                      darkMode
                        ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                  <button
                    type="submit"
                    disabled={isAiThinking}
                    className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isAiThinking ? '...' : t.home.sendBtn}</span>
                  </button>
                </form>

                {/* Concise Quick Action Pills */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className={`text-[11px] font-semibold ${mutedText} mr-1`}>
                    {t.home.quickVoiceTitle}:
                  </span>
                  {VOICE_DEMO_COMMANDS.map((cmd) => (
                    <button
                      key={cmd.id}
                      type="button"
                      onClick={() => processAiCommand(lang === 'hi' ? cmd.queryHi : cmd.queryEn)}
                      className={`px-2.5 py-1 rounded-md border text-[11px] font-medium transition-all cursor-pointer ${
                        darkMode
                          ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {lang === 'hi' ? cmd.labelHi : cmd.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact AI Stream */}
              <div
                className={`p-4 border-t max-h-72 overflow-y-auto space-y-2.5 ${
                  darkMode ? 'bg-slate-950/60 border-slate-800/80' : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                {chatMessages.map((msg) => {
                  const isBot = msg.role === 'assistant';
                  const displayText = lang === 'hi' ? msg.textHi : msg.textEn;
                  const badgeText = lang === 'hi' ? msg.actionBadgeHi : msg.actionBadgeEn;

                  return (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-lg border flex items-start justify-between gap-3 text-xs sm:text-sm ${
                        isBot ? cardBg : 'bg-emerald-500/10 border-emerald-500/20'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                            isBot
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {isBot ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                        </div>
                        <div className="space-y-1">
                          {badgeText && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold">
                              <Zap className="w-2.5 h-2.5" />
                              {badgeText}
                            </span>
                          )}
                          <p className="leading-relaxed">{displayText}</p>
                          {msg.targetTab && (
                            <button
                              onClick={() => setActiveTab(msg.targetTab!)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:underline cursor-pointer"
                            >
                              <span>{lang === 'hi' ? 'मॉड्यूल खोलें' : 'Open Module'}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {isBot && (
                        <button
                          onClick={() => speakText(displayText)}
                          className={`p-1.5 rounded-md ${subCardBg} hover:text-emerald-400 shrink-0 cursor-pointer`}
                          title={t.listenBtn}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clean 3-Card System Snapshot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`${cardBg} rounded-xl border p-4 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>
                      {t.tabs.lab}
                    </span>
                    <span className="text-xs font-mono font-semibold text-sky-400">
                      {temp}°C • {milkAnalysis.predictedSafeHours}h
                    </span>
                  </div>
                  <p className="text-sm font-bold">
                    {milkAnalysis.gradeLabel} — ₹{milkAnalysis.ratePerLiter}/L
                  </p>
                  <p className={`text-xs ${mutedText} mt-1`}>
                    Fat {fat}% • SNF {snf}% • CLR {clr} • pH {ph}
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('lab')}
                  className={`mt-4 w-full py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer ${subCardBg} hover:border-emerald-500/50`}
                >
                  <span>{t.tabs.lab}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className={`${cardBg} rounded-xl border p-4 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>
                      {t.tabs.charts}
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-400">
                      +₹{latestMonthPnl.profit.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-sm font-bold">
                    {t.charts.income}: ₹{latestMonthPnl.income.toLocaleString('en-IN')}
                  </p>
                  <p className={`text-xs ${mutedText} mt-1`}>
                    {t.kpis.pendingLoans}: ₹{loanSummary.totalPending.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => setActiveTab('charts')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer ${subCardBg} hover:border-emerald-500/50`}
                  >
                    <span>P&L</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('khata')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer ${subCardBg} hover:border-amber-500/50`}
                  >
                    <span>Khata</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className={`${cardBg} rounded-xl border p-4 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>
                      {t.tabs.inventory}
                    </span>
                    <span className="text-xs font-mono font-semibold text-amber-400">
                      {lowStockItems.length} Alerts
                    </span>
                  </div>
                  <p className="text-sm font-bold">
                    {lowStockItems.length > 0
                      ? lang === 'hi'
                        ? lowStockItems[0].nameHi
                        : lowStockItems[0].nameEn
                      : t.inventory.goodStock}
                  </p>
                  <p className={`text-xs ${mutedText} mt-1`}>
                    {cattleCount} Herd • {dailyYield} L/d • {selectedModel}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={() => setActiveTab('inventory')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer ${subCardBg} hover:border-emerald-500/50`}
                  >
                    <span>{t.tabs.inventory}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('backend')}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between cursor-pointer ${subCardBg} hover:border-sky-500/50`}
                  >
                    <span>API</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 1: MILK LAB, IOT PROBE & SHELF-LIFE AI
        ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column: Controls */}
              <div className={`lg:col-span-7 ${cardBg} rounded-xl border p-5`}>
                <div className="border-b border-slate-800/60 pb-3.5 mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <Milk className="w-4 h-4 text-emerald-400" />
                    {t.lab.title}
                  </h2>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSimulateIotProbe}
                      disabled={isSimulatingIot}
                      className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Wifi className={`w-3.5 h-3.5 ${isSimulatingIot ? 'animate-spin' : ''}`} />
                      <span>{isSimulatingIot ? t.lab.iotSimulating : t.lab.iotSimulateBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowReceiptModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{t.lab.receiptBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Supplier & Cattle Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div className="sm:col-span-2">
                    <label className={`block text-[11px] font-semibold ${mutedText} mb-1`}>
                      {t.lab.farmerName}
                    </label>
                    <input
                      type="text"
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className={`w-full px-3 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none focus:border-emerald-500 ${
                        darkMode
                          ? 'bg-slate-900 border-slate-800 text-white'
                          : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold ${mutedText} mb-1`}>
                      {t.lab.cattleType}
                    </label>
                    <div
                      className={`grid grid-cols-2 gap-1 p-1 rounded-lg ${
                        darkMode ? 'bg-slate-900' : 'bg-slate-100'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setCattleType('cow');
                          setFat(4.2);
                          setSnf(8.5);
                        }}
                        className={`py-1 rounded text-xs font-semibold cursor-pointer ${
                          cattleType === 'cow' ? 'bg-emerald-600 text-white' : mutedText
                        }`}
                      >
                        {t.lab.cow}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCattleType('buffalo');
                          setFat(6.4);
                          setSnf(9.0);
                        }}
                        className={`py-1 rounded text-xs font-semibold cursor-pointer ${
                          cattleType === 'buffalo' ? 'bg-emerald-600 text-white' : mutedText
                        }`}
                      >
                        {t.lab.buffalo}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Parameter Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className={`${subCardBg} p-3 rounded-lg border`}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{t.lab.quantity}</span>
                      <span className="font-mono text-emerald-400">{milkQty} L</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="200"
                      step="1"
                      value={milkQty}
                      onChange={(e) => setMilkQty(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className={`${subCardBg} p-3 rounded-lg border`}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{t.lab.fat}</span>
                      <span className="font-mono text-emerald-400">{fat}%</span>
                    </div>
                    <input
                      type="range"
                      min="2.5"
                      max="9.0"
                      step="0.1"
                      value={fat}
                      onChange={(e) => setFat(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className={`${subCardBg} p-3 rounded-lg border`}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{t.lab.snf}</span>
                      <span className="font-mono text-emerald-400">{snf}%</span>
                    </div>
                    <input
                      type="range"
                      min="6.5"
                      max="10.5"
                      step="0.1"
                      value={snf}
                      onChange={(e) => setSnf(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className={`${subCardBg} p-3 rounded-lg border`}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{t.lab.clr}</span>
                      <span className={`font-mono ${clr < 25 ? 'text-amber-400' : 'text-sky-400'}`}>
                        {clr}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="18"
                      max="34"
                      step="0.5"
                      value={clr}
                      onChange={(e) => setClr(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  <div className={`${subCardBg} p-3 rounded-lg border`}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{t.lab.ph}</span>
                      <span
                        className={`font-mono ${
                          ph < 6.45 || ph > 6.8 ? 'text-red-400' : 'text-emerald-400'
                        }`}
                      >
                        {ph}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5.8"
                      max="7.4"
                      step="0.02"
                      value={ph}
                      onChange={(e) => setPh(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className={`${subCardBg} p-3 rounded-lg border`}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{t.lab.temp}</span>
                      <span className={`font-mono ${temp > 15 ? 'text-amber-400' : 'text-sky-400'}`}>
                        {temp}°C
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="38"
                      step="1"
                      value={temp}
                      onChange={(e) => setTemp(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>

                  <div className={`sm:col-span-2 ${subCardBg} p-3 rounded-lg border`}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span>{t.lab.targetHours}</span>
                      <span className="font-mono text-sky-400">
                        {targetHours} {t.lab.results.hours}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="48"
                      step="2"
                      value={targetHours}
                      onChange={(e) => setTargetHours(Number(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 5-Parameter Adulteration Strip Tests */}
                <div className="mt-4 pt-4 border-t border-slate-800/60">
                  <label className={`block text-[11px] font-semibold uppercase tracking-wider ${mutedText} mb-2.5`}>
                    {t.lab.stripTests}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { key: 'urea' as const, label: t.lab.urea },
                      { key: 'starch' as const, label: t.lab.starch },
                      { key: 'detergent' as const, label: t.lab.detergent },
                      { key: 'neutralizer' as const, label: t.lab.neutralizer },
                      { key: 'peroxide' as const, label: t.lab.peroxide }
                    ].map((item) => {
                      const isPositive = strips[item.key];
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => toggleStrip(item.key)}
                          className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                            isPositive
                              ? 'bg-red-500/15 border-red-500/50 text-red-300'
                              : `${subCardBg} hover:border-emerald-500/40`
                          }`}
                        >
                          <div className="text-xs font-semibold truncate">{item.label}</div>
                          <div className="mt-1 flex items-center gap-1 text-[11px] font-medium">
                            {isPositive ? (
                              <>
                                <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
                                <span className="text-red-400">{t.lab.detected}</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                                <span className="text-emerald-400">{t.lab.clean}</span>
                              </>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSaveMilkBatch}
                      className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t.lab.saveBatchBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleRunLiveGemmaAnalysis}
                      disabled={isCallingGemma}
                      className={`px-4 py-2 rounded-lg border font-semibold text-xs flex items-center gap-1.5 cursor-pointer ${subCardBg} hover:border-emerald-500/50`}
                    >
                      <Sparkles className={`w-3.5 h-3.5 text-emerald-400 ${isCallingGemma ? 'animate-spin' : ''}`} />
                      <span>{isCallingGemma ? '...' : t.lab.askGemmaBtn}</span>
                    </button>
                  </div>

                  {batchSavedToast && (
                    <span className="text-xs font-semibold text-emerald-400">
                      ✓ {t.lab.savedSuccess}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Analytical Output */}
              <div className="lg:col-span-5 space-y-4">
                {/* Valuation Card */}
                <div className={`${cardBg} rounded-xl border p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${mutedText}`}>
                      {t.lab.results.qualityTitle}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-bold ${
                        milkAnalysis.grade === 'A+'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : milkAnalysis.grade === 'B'
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-red-500/15 text-red-400'
                      }`}
                    >
                      {milkAnalysis.gradeLabel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className={`${subCardBg} p-3 rounded-lg border`}>
                      <span className={`text-[11px] ${mutedText} block`}>
                        {t.lab.results.ratePerLiter}
                      </span>
                      <span className="text-lg font-bold">₹{milkAnalysis.ratePerLiter}/L</span>
                    </div>
                    <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                      <span className="text-[11px] text-emerald-400 block">
                        {t.lab.results.totalPayout} ({milkQty}L)
                      </span>
                      <span className="text-lg font-bold text-emerald-400">
                        ₹{milkAnalysis.totalPayout.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Thermal & Shelf-Life Card */}
                <div className={`${cardBg} rounded-xl border p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${mutedText}`}>
                      {t.lab.results.shelfLifeTitle}
                    </span>
                    <Thermometer className="w-4 h-4 text-sky-400" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className={`${subCardBg} p-3 rounded-lg border`}>
                      <span className={`text-[11px] ${mutedText} block`}>
                        {t.lab.results.safeFor} ({temp}°C)
                      </span>
                      <span className="text-lg font-bold text-sky-400">
                        {milkAnalysis.predictedSafeHours} {t.lab.results.hours}
                      </span>
                    </div>

                    <div className={`${subCardBg} p-3 rounded-lg border`}>
                      <span className={`text-[11px] ${mutedText} block`}>
                        {t.lab.results.reqTemp} ({targetHours}h)
                      </span>
                      <span className="text-lg font-bold text-indigo-400">
                        {milkAnalysis.requiredTemp}°C
                      </span>
                    </div>
                  </div>

                  {/* Decay Chart */}
                  <div className="h-32 w-full mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={milkAnalysis.decayCurveData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1e293b' : '#e2e8f0'} />
                        <XAxis dataKey="tempLabel" tick={{ fontSize: 10, fill: '#64748b' }} />
                        <YAxis tick={{ fontSize: 10, fill: '#64748b' }} unit="h" width={28} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0f172a',
                            borderColor: '#334155',
                            borderRadius: '8px',
                            color: '#fff',
                            fontSize: '11px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="safeHours"
                          name="Safe Window (h)"
                          stroke="#38bdf8"
                          fill="#0284c7"
                          fillOpacity={0.25}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div
                    className={`mt-3 p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 ${
                      milkAnalysis.predictedSafeHours <= 4
                        ? 'bg-red-500/10 border-red-500/30 text-red-300'
                        : milkAnalysis.needsImmediateCooling
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {milkAnalysis.predictedSafeHours <= 4
                        ? t.lab.results.boilAlert
                        : milkAnalysis.needsImmediateCooling
                        ? `${t.lab.results.coolingAction}: ${temp}°C → ${milkAnalysis.requiredTemp}°C`
                        : t.lab.results.tempSafe}
                    </span>
                  </div>
                </div>

                {/* Purity Card */}
                <div className={`${cardBg} rounded-xl border p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-semibold uppercase tracking-wider ${mutedText}`}>
                      {t.lab.results.purityTitle}
                    </span>
                    <span className={`text-[11px] font-mono ${mutedText}`}>
                      SG {(1 + clr / 1000).toFixed(3)}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-lg border flex items-center gap-2.5 text-xs font-semibold ${
                      milkAnalysis.purityStatus === 'PURE'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : milkAnalysis.purityStatus === 'WATER'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        : 'bg-red-500/10 border-red-500/30 text-red-300'
                    }`}
                  >
                    {milkAnalysis.purityStatus === 'PURE' ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span>{milkAnalysis.purityMessage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Gemma Advisory Strip */}
            <div className={`${cardBg} rounded-xl p-4 border`}>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold">{t.lab.gemmaTitle}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                    {selectedModel}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunLiveGemmaAnalysis}
                    disabled={isCallingGemma}
                    className={`p-1.5 rounded-lg border cursor-pointer ${subCardBg}`}
                    title="Refresh"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCallingGemma ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleSpeakAdvisory}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? t.stopBtn : t.listenBtn}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {milkAnalysis.gemmaAdvice.map((point, idx) => (
                  <div
                    key={idx}
                    className={`${subCardBg} border rounded-lg p-3 text-xs leading-relaxed flex items-start gap-2`}
                  >
                    <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 2: FINANCIALS (P&L + CREDIT CHARTS)
        ========================================== */}
        {activeTab === 'charts' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className={`lg:col-span-8 ${cardBg} rounded-xl border p-5`}>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  {t.charts.pnlTitle}
                </h2>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400">
                    {t.charts.income}: ₹{latestMonthPnl.income.toLocaleString('en-IN')}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-red-500/10 text-red-400">
                    {t.charts.expense}: ₹{latestMonthPnl.expense.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pnlData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#1e293b' : '#e2e8f0'} />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                    <Tooltip
                      formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
                      contentStyle={{
                        backgroundColor: darkMode ? '#0f172a' : '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #334155',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="income" name={t.charts.income} fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expense" name={t.charts.expense} fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" name={t.charts.netProfit} fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <form
                onSubmit={handleAddTransaction}
                className="mt-4 pt-4 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-end"
              >
                <div>
                  <label className={`block text-[11px] font-semibold ${mutedText} mb-1`}>
                    {t.charts.txType}
                  </label>
                  <select
                    value={newTxType}
                    onChange={(e) => setNewTxType(e.target.value)}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  >
                    <option value="income">{t.charts.txIncome}</option>
                    <option value="expense">{t.charts.txExpense}</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-[11px] font-semibold ${mutedText} mb-1`}>
                    {t.charts.txAmount}
                  </label>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={newTxAmount}
                    onChange={(e) => setNewTxAmount(Number(e.target.value))}
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] font-semibold ${mutedText} mb-1`}>
                    {t.charts.txNote}
                  </label>
                  <input
                    type="text"
                    value={newTxNote}
                    onChange={(e) => setNewTxNote(e.target.value)}
                    placeholder="Ref..."
                    className={`w-full px-2.5 py-1.5 rounded-lg border text-xs ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.charts.addTxBtn}</span>
                </button>
              </form>
            </div>

            <div className={`lg:col-span-4 ${cardBg} rounded-xl border p-5 flex flex-col justify-between`}>
              <div>
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-amber-400" />
                  {t.charts.loanChartTitle}
                </h2>

                <div className="h-56 w-full mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={loanSummary.pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {loanSummary.pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`} />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-slate-800/60">
                {loans.slice(0, 3).map((loan) => {
                  const pct = Math.round((loan.recovered / loan.totalLoan) * 100);
                  return (
                    <div key={loan.id} className="text-xs">
                      <div className="flex justify-between font-semibold mb-1">
                        <span className="truncate max-w-[170px]">
                          {lang === 'hi' ? loan.nameHi : loan.nameEn}
                        </span>
                        <span className="font-mono text-emerald-400">{pct}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 3: CUSTOMER LOAN KHATA
        ========================================== */}
        {activeTab === 'khata' && (
          <div className={`${cardBg} rounded-xl border p-5 space-y-4`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-800/60 pb-3.5">
              <h2 className="text-base font-bold flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                {t.khata.title}
              </h2>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                  <input
                    type="text"
                    placeholder={t.khata.searchPlaceholder}
                    value={loanSearch}
                    onChange={(e) => setLoanSearch(e.target.value)}
                    className={`pl-8 pr-3 py-1.5 rounded-lg border text-xs ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                </div>

                <form onSubmit={handleAddNewLoan} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={lang === 'hi' ? 'नाम...' : 'Account name...'}
                    value={newLoanName}
                    onChange={(e) => setNewLoanName(e.target.value)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    value={newLoanAmount}
                    onChange={(e) => setNewLoanAmount(Number(e.target.value))}
                    className={`w-24 px-2.5 py-1.5 rounded-lg border text-xs font-mono ${
                      darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.khata.addLoanBtn}</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b border-slate-800/60 text-[11px] uppercase ${mutedText} font-semibold`}>
                    <th className="py-2.5 px-3">{t.khata.colName}</th>
                    <th className="py-2.5 px-3">{t.khata.colTotal}</th>
                    <th className="py-2.5 px-3">{t.khata.colPaid}</th>
                    <th className="py-2.5 px-3">{t.khata.colPending}</th>
                    <th className="py-2.5 px-3 w-44">{t.khata.colProgress}</th>
                    <th className="py-2.5 px-3 text-right">{t.khata.colAction}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-xs">
                  {filteredLoans.map((loan) => {
                    const pending = Math.max(0, loan.totalLoan - loan.recovered);
                    const pct = Math.round((loan.recovered / loan.totalLoan) * 100);
                    return (
                      <tr key={loan.id} className="hover:bg-slate-800/20">
                        <td className="py-3 px-3">
                          <div className="font-semibold">
                            {lang === 'hi' ? loan.nameHi : loan.nameEn}
                          </div>
                          <div className={`text-[11px] ${mutedText}`}>
                            {lang === 'hi' ? loan.purposeHi : loan.purposeEn}
                          </div>
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold">
                          ₹{loan.totalLoan.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold text-emerald-400">
                          ₹{loan.recovered.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3 font-mono font-semibold text-amber-400">
                          ₹{pending.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px]">{pct}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          {pending > 0 ? (
                            <button
                              onClick={() => handleDeductEmi(loan.id)}
                              className="px-3 py-1 rounded-md bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold cursor-pointer"
                            >
                              {t.khata.deductBtn}
                            </button>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[11px] font-semibold">
                              <CheckCircle2 className="w-3 h-3" />
                              {t.khata.settled}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 4: SMART INVENTORY
        ========================================== */}
        {activeTab === 'inventory' && (
          <div className={`${cardBg} rounded-xl border p-5`}>
            <h2 className="text-base font-bold flex items-center gap-2 mb-4">
              <Package className="w-4 h-4 text-emerald-400" />
              {t.inventory.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventory.map((item) => {
                const daysRemaining = Math.round((item.stock / item.dailyBurn) * 10) / 10;
                const isLow = daysRemaining < 5;
                return (
                  <div
                    key={item.id}
                    className={`rounded-xl p-4 border flex flex-col justify-between ${
                      isLow ? 'bg-red-500/5 border-red-500/30' : subCardBg
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-sm">
                          {lang === 'hi' ? item.nameHi : item.nameEn}
                        </h3>
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-mono font-semibold shrink-0 ${
                            isLow
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-emerald-500/15 text-emerald-400'
                          }`}
                        >
                          {daysRemaining} {t.inventory.daysLeft}
                        </span>
                      </div>

                      <div className="mt-3 flex items-baseline justify-between">
                        <div>
                          <span className="text-2xl font-bold font-mono">{item.stock}</span>
                          <span className={`text-xs ${mutedText} ml-1`}>
                            {lang === 'hi' ? item.unitHi : item.unitEn}
                          </span>
                        </div>
                        <span className={`text-[11px] ${mutedText}`}>
                          {t.inventory.dailyUse} {item.dailyBurn}/d
                        </span>
                      </div>

                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2.5">
                        <div
                          className={`h-full rounded-full ${
                            isLow ? 'bg-red-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${Math.min(100, daysRemaining * 8)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/50">
                      <button
                        onClick={() => handleInventoryChange(item.id, -item.dailyBurn)}
                        className="py-1.5 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                        <span>{t.inventory.consumeBtn}</span>
                      </button>
                      <button
                        onClick={() => handleInventoryChange(item.id, 50)}
                        className="py-1.5 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{t.inventory.restockBtn}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 5: YIELD & RATION OPTIMIZATION
        ========================================== */}
        {activeTab === 'optimize' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className={`lg:col-span-5 ${cardBg} rounded-xl border p-5 space-y-4`}>
              <h2 className="text-base font-bold flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                {t.optimize.title}
              </h2>

              <div className="space-y-3">
                <div className={`${subCardBg} p-3.5 rounded-lg border`}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>{t.optimize.cattleCount}</span>
                    <span className="font-mono text-emerald-400">{cattleCount}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="60"
                    value={cattleCount}
                    onChange={(e) => setCattleCount(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className={`${subCardBg} p-3.5 rounded-lg border`}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>{t.optimize.currentYield}</span>
                    <span className="font-mono text-emerald-400">{dailyYield} L/d</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="600"
                    step="5"
                    value={dailyYield}
                    onChange={(e) => setDailyYield(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className={`${subCardBg} p-3.5 rounded-lg border`}>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>{t.optimize.chillingCap}</span>
                    <span className="font-mono text-sky-400">{chillingCap} L</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="25"
                    value={chillingCap}
                    onChange={(e) => setChillingCap(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleGenerateCustomRationAi}
                  disabled={isCallingGemma}
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isCallingGemma ? 'animate-spin' : ''}`} />
                  <span>{isCallingGemma ? '...' : t.optimize.generateAiPlanBtn}</span>
                </button>
              </div>
            </div>

            <div className={`lg:col-span-7 ${cardBg} rounded-xl border p-5 space-y-4`}>
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  {t.optimize.planTitle}
                </h3>
                <span className="text-[11px] font-mono text-emerald-400">{selectedModel}</span>
              </div>

              <div className="space-y-3">
                <div className={`${subCardBg} p-3.5 rounded-lg border`}>
                  <h4 className="font-semibold text-emerald-400 text-xs flex items-center gap-1.5">
                    <Sprout className="w-3.5 h-3.5" />
                    {t.optimize.feedOpt}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    {lang === 'hi'
                      ? `${cattleCount} पशुओं हेतु: ${cattleCount * 15}kg हरा चारा + ${cattleCount * 6}kg सूखा भूसा + ${Math.round(dailyYield * 0.4)}kg खल/दाना + ${cattleCount * 50}g मिनरल मिक्चर। अनुमानित वृद्धि: +${Math.round(dailyYield * 0.12)} L/दिन।`
                      : `Daily allocation for ${cattleCount} herd: ${cattleCount * 15}kg Green Fodder + ${cattleCount * 6}kg Dry Straw + ${Math.round(dailyYield * 0.4)}kg Bypass Protein + ${cattleCount * 50}g Mineral Mix. Est. yield boost: +${Math.round(dailyYield * 0.12)} L/day.`}
                  </p>
                </div>

                <div className={`${subCardBg} p-3.5 rounded-lg border`}>
                  <h4 className="font-semibold text-sky-400 text-xs flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5" />
                    {t.optimize.tempOpt}
                  </h4>
                  <p className="text-xs mt-1 leading-relaxed">
                    {lang === 'hi'
                      ? `दो-चरणीय कूलिंग: 45 मिनट में 15°C प्री-कूलिंग, फिर 4°C बल्क स्टोरेज। मासिक बिजली बचत: ~₹${Math.round(powerCost * 0.18)}।`
                      : `Two-stage cooling: pre-cool to 15°C within 45 mins before 4°C bulk storage. Compressor savings: ~₹${Math.round(powerCost * 0.18)}/mo.`}
                  </p>
                </div>

                {customOptAdvice && (
                  <div className="p-3.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-xs leading-relaxed">
                    <div className="font-bold text-indigo-300 mb-1">{selectedModel} Output:</div>
                    <div className="whitespace-pre-line">{customOptAdvice}</div>
                  </div>
                )}

                <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
                  <span className="font-semibold text-xs text-emerald-300">
                    {t.optimize.profitOpt}
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-400">
                    +₹{Math.round(dailyYield * 3.8 * 30).toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            TAB 6: GEMMA API & FASTAPI CONSOLE
        ========================================== */}
        {activeTab === 'backend' && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className={`lg:col-span-5 ${cardBg} rounded-xl border p-5 space-y-4`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold flex items-center gap-2">
                    <Server className="w-4 h-4 text-emerald-400" />
                    {t.backend.title}
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[11px] font-mono">
                    200 OK
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className={`block text-[11px] font-semibold ${mutedText} mb-1`}>
                      {t.backend.modelLabel}
                    </label>
                    <select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border text-xs font-mono ${
                        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300'
                      }`}
                    >
                      <option value="gemma-3-27b-it">gemma-3-27b-it</option>
                      <option value="gemma-3-12b-it">gemma-3-12b-it</option>
                      <option value="gemma-3-4b-it">gemma-3-4b-it</option>
                    </select>
                  </div>

                  <p className={`text-[11px] leading-relaxed ${mutedText}`}>
                    The Gemma API key is stored securely on the server and is never sent to your browser.
                  </p>

                  <button
                    type="button"
                    onClick={handleRunLiveGemmaAnalysis}
                    disabled={isCallingGemma}
                    className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isCallingGemma ? '...' : t.backend.testEndpointBtn}</span>
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/60 text-center">
                  <div className={`${subCardBg} p-2 rounded-lg border`}>
                    <Cpu className="w-3.5 h-3.5 text-emerald-400 mx-auto mb-1" />
                    <div className="text-[11px] font-bold">Gemma 2</div>
                  </div>
                  <div className={`${subCardBg} p-2 rounded-lg border`}>
                    <Database className="w-3.5 h-3.5 text-sky-400 mx-auto mb-1" />
                    <div className="text-[11px] font-bold">FastAPI</div>
                  </div>
                  <div className={`${subCardBg} p-2 rounded-lg border`}>
                    <Activity className="w-3.5 h-3.5 text-amber-400 mx-auto mb-1" />
                    <div className="text-[11px] font-bold">ESP32 IoT</div>
                  </div>
                </div>
              </div>

              {/* Request Telemetry Logs */}
              <div className={`lg:col-span-7 ${cardBg} rounded-xl border p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-sky-400" />
                    <span>Telemetry & Inference Logs</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-400">{apiLatency}ms</span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {apiLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/90 text-xs font-mono text-slate-300 flex items-center justify-between gap-2"
                    >
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold text-[10px]">
                            {log.status}
                          </span>
                          <span className="text-sky-400">{log.endpoint}</span>
                          <span className="text-slate-500 text-[10px]">{log.time}</span>
                        </div>
                        <div className="text-slate-400 text-[11px] font-sans truncate mt-0.5">
                          {log.summary}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-400 text-[10px] shrink-0">
                        {log.latency}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FastAPI Source Code Viewer */}
            <div className="bg-slate-950 text-slate-100 rounded-xl border border-slate-800 p-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-xs sm:text-sm font-mono">backend/main.py</h3>
                </div>

                <button
                  onClick={handleCopyBackendCode}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? t.backend.copiedBtn : t.backend.copyCodeBtn}</span>
                </button>
              </div>

              <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-80 leading-relaxed p-3.5 rounded-lg bg-[#090D16] border border-slate-800/80">
                <code>{FASTAPI_BACKEND_CODE}</code>
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}