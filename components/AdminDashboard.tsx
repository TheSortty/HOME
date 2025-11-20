import React, { useState, useMemo } from 'react';
import LogoutIcon from './icons/LogoutIcon';
import ChartIcon from './icons/ChartIcon';
import UsersIcon from './icons/UsersIcon';
import CalendarIcon from './icons/CalendarIcon';
import CheckIcon from './icons/CheckIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = 'overview' | 'admissions' | 'students' | 'calendar';
type RegistrationStatus = 'PENDING_REVIEW' | 'PENDING_PAYMENT' | 'APPROVED' | 'REJECTED';
type StudentStatus = 'ACTIVE' | 'CONFLICT' | 'GRADUATED' | 'DROPPED';
type PackageLevel = 'INICIAL' | 'AVANZADO' | 'PROGRAMA LIDER';

interface Registration {
  id: number;
  name: string;
  email: string;
  date: string;
  status: RegistrationStatus;
  answers: { question: string; answer: string }[];
  selectedPackage: PackageLevel | 'COMBO INICIAL+AVANZADO' | 'FULL EXPERIENCE';
}

interface CycleEvent {
  id: number;
  startDate: string; // YYYY-MM-DD (Thursday)
  endDate: string;   // YYYY-MM-DD (Sunday)
  month: string;     // e.g., "Mayo"
  year: number;
  level: PackageLevel;
  enrolledCount: number;
  capacity: number;
  status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface Student {
  id: number;
  name: string;
  pl: number;
  cycleId: number; // Links to CycleEvent
  currentPackage: PackageLevel;
  purchasedPackage: string;
  status: StudentStatus;
  progress: number;
  attendance: [boolean, boolean, boolean, boolean];
  nextPackageLocked: boolean;
}

// --- MOCK DATA ENGINE ---

const generateMockData = () => {
  const cycles: CycleEvent[] = [];
  const students: Student[] = [];
  const registrations: Registration[] = [];

  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const packageLevels: PackageLevel[] = ['INICIAL', 'AVANZADO', 'PROGRAMA LIDER'];
  const firstNames = ['Ana', 'Carlos', 'Sofia', 'Miguel', 'Lucia', 'Juan', 'Maria', 'Pedro', 'Valentina', 'Diego', 'Elena', 'Javier', 'Camila', 'Fernando', 'Isabella', 'Ricardo'];
  const lastNames = ['Garcia', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Perez', 'Sanchez', 'Ramirez', 'Torres', 'Flores', 'Rivera', 'Gomez', 'Diaz'];

  // 1. Generate 50 Cycles throughout 2024-2025
  let currentMonthIndex = 0; // Start Jan 2024
  let dayOffset = 4; // First Thursday
  
  for (let i = 1; i <= 50; i++) {
    const level = packageLevels[i % 3];
    const monthIndex = currentMonthIndex % 12;
    const monthName = months[monthIndex];
    const year = 2024 + Math.floor(currentMonthIndex / 12);
    
    const startDay = dayOffset;
    const endDay = dayOffset + 3;
    
    // Determine status based on "current date" simulation (assume mid-2024)
    let status: 'UPCOMING' | 'IN_PROGRESS' | 'COMPLETED' = 'UPCOMING';
    if (year === 2024 && monthIndex < 5) status = 'COMPLETED';
    if (year === 2024 && monthIndex === 5) status = 'IN_PROGRESS';

    cycles.push({
      id: i,
      startDate: `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`,
      endDate: `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`,
      month: monthName,
      year: year,
      level: level,
      enrolledCount: 0, // Will calc below
      capacity: level === 'INICIAL' ? 30 : 20,
      status: status
    });

    dayOffset += 7;
    // Simple month turnover logic
    if (dayOffset > 22) { 
      dayOffset = (dayOffset % 22) + 1; 
      currentMonthIndex++;
    }
  }

  // 2. Generate 100 Students
  for (let i = 1; i <= 100; i++) {
    // Distribute students mostly in past/current cycles
    const cycleIndex = Math.floor(Math.random() * 25); 
    const cycle = cycles[cycleIndex];
    cycle.enrolledCount++;

    const isConflict = Math.random() > 0.85; // 15% conflict rate
    const isGraduated = !isConflict && cycle.status === 'COMPLETED';
    
    students.push({
      id: i,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      pl: cycle.id + 20, // Arbitrary PL number logic
      cycleId: cycle.id,
      currentPackage: cycle.level,
      purchasedPackage: Math.random() > 0.7 ? 'COMBO INICIAL+AVANZADO' : cycle.level,
      status: isConflict ? 'CONFLICT' : isGraduated ? 'GRADUATED' : 'ACTIVE',
      progress: isGraduated ? 100 : isConflict ? 40 : Math.floor(Math.random() * 80),
      attendance: isGraduated 
        ? [true, true, true, true] 
        : isConflict 
          ? [true, false, false, false] 
          : [true, true, false, false], 
      nextPackageLocked: !isGraduated
    });
  }

  // 3. Generate 20 Registrations
  for (let i = 1; i <= 20; i++) {
    registrations.push({
      id: 1000 + i,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      email: `user${i}@example.com`,
      date: `2024-06-${10 + i}`,
      status: i > 15 ? 'PENDING_PAYMENT' : 'PENDING_REVIEW',
      selectedPackage: Math.random() > 0.5 ? 'INICIAL' : 'COMBO INICIAL+AVANZADO',
      answers: [
        { question: '¿Por qué quieres unirte?', answer: 'Busco transformación personal profunda.' },
        { question: 'Compromiso', answer: 'Sí, total.' }
      ]
    });
  }

  return { cycles, students, registrations };
};

const { cycles: MOCK_CYCLES, students: MOCK_STUDENTS, registrations: MOCK_REGISTRATIONS } = generateMockData();


const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  // State for data
  const [registrations, setRegistrations] = useState<Registration[]>(MOCK_REGISTRATIONS);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [cycles] = useState<CycleEvent[]>(MOCK_CYCLES);
  
  // Modal States
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

  // Calendar Filter
  const [calendarSearch, setCalendarSearch] = useState('');

  // --- LOGIC ---

  // Admission Logic
  const handleApproveRegistration = (id: number) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status: 'PENDING_PAYMENT' } : r));
    setSelectedRegistration(null);
  };

  const handleConfirmPayment = (reg: Registration) => {
    const newStudent: Student = {
      id: Math.floor(Math.random() * 10000) + 2000,
      name: reg.name,
      pl: 60, // Next cycle
      cycleId: 30, // Assign to upcoming cycle
      currentPackage: 'INICIAL', 
      purchasedPackage: reg.selectedPackage,
      status: 'ACTIVE',
      progress: 0,
      attendance: [false, false, false, false],
      nextPackageLocked: true
    };

    setStudents(prev => [...prev, newStudent]);
    setRegistrations(prev => prev.filter(r => r.id !== reg.id)); 
  };

  // Attendance Logic (The Iron Rule)
  const handleAttendanceToggle = (studentId: number, dayIndex: number) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== studentId) return student;
      if (student.status === 'CONFLICT' || student.status === 'GRADUATED') return student; 

      const newAttendance = [...student.attendance] as [boolean, boolean, boolean, boolean];
      
      // Sequence Check
      if (dayIndex > 0 && !newAttendance[dayIndex - 1]) {
        if (!newAttendance[dayIndex]) return student; 
      }

      // Toggle
      newAttendance[dayIndex] = !newAttendance[dayIndex];

      // Conflict Logic
      if (dayIndex === 0 && !newAttendance[0]) {
        newAttendance[1] = false; newAttendance[2] = false; newAttendance[3] = false;
      } else if (dayIndex === 1 && !newAttendance[1]) {
        newAttendance[2] = false; newAttendance[3] = false;
        if (newAttendance[0]) return { ...student, attendance: newAttendance, status: 'CONFLICT' };
      } else if (dayIndex === 2 && !newAttendance[2]) {
        newAttendance[3] = false;
        if (newAttendance[1]) return { ...student, attendance: newAttendance, status: 'CONFLICT' };
      } else if (dayIndex === 3 && !newAttendance[3]) {
        if (newAttendance[2]) return { ...student, attendance: newAttendance, status: 'CONFLICT' };
      }

      // Graduation Check
      let newStatus: StudentStatus = student.status;
      let nextLocked = student.nextPackageLocked;
      if (newAttendance.every(day => day)) {
        newStatus = 'GRADUATED';
        nextLocked = false; 
      }

      const activeDays = newAttendance.filter(Boolean).length;
      const newProgress = (activeDays / 4) * 100;

      return {
        ...student,
        attendance: newAttendance,
        status: newStatus as StudentStatus,
        nextPackageLocked: nextLocked,
        progress: newProgress
      };
    }));
  };

  const handleReschedule = (studentId: number) => {
    setStudents(prev => prev.map(student => {
      if (student.id !== studentId) return student;
      return {
        ...student,
        status: 'ACTIVE',
        attendance: [false, false, false, false],
        progress: 0,
      };
    }));
  };

  const handlePromoteStudent = (studentId: number) => {
      setStudents(prev => prev.map(student => {
          if (student.id !== studentId) return student;
          
          let nextPkg: PackageLevel = student.currentPackage;
          if (student.currentPackage === 'INICIAL') nextPkg = 'AVANZADO';
          else if (student.currentPackage === 'AVANZADO') nextPkg = 'PROGRAMA LIDER';
          else return student; 

          return {
              ...student,
              currentPackage: nextPkg,
              status: 'ACTIVE',
              attendance: [false, false, false, false],
              progress: 0,
              nextPackageLocked: true
          }
      }))
  }

  // Helper for Calendar
  const filteredCycles = useMemo(() => {
    return cycles.filter(c => 
      c.startDate.includes(calendarSearch) || 
      c.month.toLowerCase().includes(calendarSearch.toLowerCase()) ||
      c.level.toLowerCase().includes(calendarSearch.toLowerCase())
    );
  }, [cycles, calendarSearch]);

  // --- RENDERERS ---

  const renderRegistrationModal = () => {
    if (!selectedRegistration) return null;
    return (
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedRegistration(null)}>
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <div>
                <h3 className="text-xl font-serif font-bold text-slate-800">{selectedRegistration.name}</h3>
                <p className="text-sm text-slate-500">{selectedRegistration.email}</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wide">
                {selectedRegistration.selectedPackage}
            </span>
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
            {selectedRegistration.answers.map((qa, idx) => (
              <div key={idx}>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{qa.question}</p>
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-slate-700 leading-relaxed">
                  {qa.answer}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end space-x-4">
            <button 
                onClick={() => setSelectedRegistration(null)}
                className="px-6 py-2 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors font-medium"
            >
                Cerrar
            </button>
            {selectedRegistration.status === 'PENDING_REVIEW' && (
                <button 
                    onClick={() => handleApproveRegistration(selectedRegistration.id)}
                    className="px-6 py-2 bg-[var(--color-darkest)] text-white rounded-lg hover:bg-[var(--color-dark)] transition-colors font-bold shadow-lg shadow-blue-900/20"
                >
                    Aprobar Solicitud
                </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderAdmissions = () => {
    const pendingReview = registrations.filter(r => r.status === 'PENDING_REVIEW');
    const pendingPayment = registrations.filter(r => r.status === 'PENDING_PAYMENT');

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
        <div className="bg-white/80 border border-slate-200/60 rounded-2xl shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[var(--color-darkest)]">Registros Pendientes</h3>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">{pendingReview.length}</span>
            </div>
            <div className="space-y-4">
                {pendingReview.length === 0 ? (
                    <p className="text-slate-400 text-center py-8 italic">No hay registros nuevos.</p>
                ) : (
                    pendingReview.map(reg => (
                        <div key={reg.id} className="bg-white border border-slate-100 p-4 rounded-xl hover:shadow-md hover:border-blue-200 transition-all group cursor-pointer" onClick={() => setSelectedRegistration(reg)}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-slate-800">{reg.name}</h4>
                                    <p className="text-xs text-slate-500 mb-2">{reg.date}</p>
                                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{reg.selectedPackage}</span>
                                </div>
                                <div className="text-[var(--color-medium)] opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRightIcon className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

        <div className="bg-white/80 border border-slate-200/60 rounded-2xl shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[var(--color-darkest)]">Pagos Pendientes</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">{pendingPayment.length}</span>
            </div>
            <div className="space-y-4">
                {pendingPayment.length === 0 ? (
                    <p className="text-slate-400 text-center py-8 italic">No hay pagos pendientes.</p>
                ) : (
                    pendingPayment.map(reg => (
                        <div key={reg.id} className="bg-white border border-slate-100 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div>
                                <h4 className="font-bold text-slate-800">{reg.name}</h4>
                                <span className="text-xs font-bold text-emerald-600">Aprobado</span>
                                <p className="text-xs text-slate-400 mt-1">{reg.selectedPackage}</p>
                            </div>
                            <button 
                                onClick={() => handleConfirmPayment(reg)}
                                className="w-full sm:w-auto px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                            >
                                Confirmar Pago
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    );
  };

  const renderStudents = () => (
    <div className="bg-white/80 border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden animate-fade-in-up">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
        <h3 className="text-xl font-bold text-[var(--color-darkest)]">Gestión de Alumnos Activos</h3>
        <div className="flex gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-center mr-2">Leyenda:</span>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-200"></div><span className="text-xs text-slate-500">Pendiente</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-xs text-slate-500">Asistió</span></div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-rose-500"></div><span className="text-xs text-slate-500">Conflicto</span></div>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[70vh]">
        <table className="w-full text-left text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-400 border-b border-slate-100 sticky top-0 z-10 shadow-sm">
            <tr>
              <th className="px-6 py-4">Alumno</th>
              <th className="px-6 py-4">Etapa Actual</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-center">Asistencia (Jue - Vie - Sab - Dom)</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {students.map((student) => (
              <tr key={student.id} className={`transition-colors ${student.status === 'CONFLICT' ? 'bg-rose-50/30' : 'hover:bg-slate-50'}`}>
                <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{student.name}</div>
                    <div className="text-xs text-slate-400">PL {student.pl} • {student.purchasedPackage}</div>
                </td>
                <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        student.currentPackage === 'AVANZADO' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                        student.currentPackage === 'PROGRAMA LIDER' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' :
                        'bg-blue-50 border-blue-200 text-blue-700'
                    }`}>
                        {student.currentPackage}
                    </span>
                </td>
                <td className="px-6 py-4">
                     {student.status === 'CONFLICT' ? (
                         <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-rose-100 text-rose-800">
                            EN CONFLICTO
                         </span>
                     ) : student.status === 'GRADUATED' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                            GRADUADO
                         </span>
                     ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-600">
                            CURSANDO
                         </span>
                     )}
                </td>
                <td className="px-6 py-4">
                    <div className="flex justify-center items-center space-x-3">
                        {['J', 'V', 'S', 'D'].map((dayLabel, idx) => {
                            const isAttended = student.attendance[idx];
                            const isLocked = student.status === 'CONFLICT' || student.status === 'GRADUATED';
                            let isClickable = !isLocked;
                            if (idx > 0 && !student.attendance[idx - 1]) isClickable = false;

                            return (
                                <div key={idx} className="flex flex-col items-center gap-1">
                                    <button
                                        disabled={!isClickable}
                                        onClick={() => handleAttendanceToggle(student.id, idx)}
                                        className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                                            isAttended 
                                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-200' 
                                                : student.status === 'CONFLICT' && idx > 0 && student.attendance[idx-1]
                                                ? 'bg-rose-100 border-rose-300 text-rose-400 cursor-not-allowed'
                                                : !isClickable
                                                ? 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
                                                : 'bg-white border-slate-300 text-transparent hover:border-[var(--color-medium)]'
                                        }`}
                                    >
                                        <CheckIcon className="w-5 h-5" />
                                    </button>
                                    <span className="text-[10px] font-bold text-slate-400">{dayLabel}</span>
                                </div>
                            )
                        })}
                    </div>
                </td>
                <td className="px-6 py-4 text-right">
                    {student.status === 'CONFLICT' && (
                        <button 
                            onClick={() => handleReschedule(student.id)}
                            className="text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 px-3 py-2 rounded-lg shadow-sm transition-colors"
                        >
                            Re-Agendar
                        </button>
                    )}
                    {student.status === 'GRADUATED' && (
                        <div className="flex flex-col items-end gap-1">
                             <span className="text-xs text-emerald-600 font-bold">¡Completado!</span>
                             {!student.nextPackageLocked && (student.currentPackage !== 'PROGRAMA LIDER') && (
                                 <button 
                                    onClick={() => handlePromoteStudent(student.id)}
                                    className="text-xs font-bold text-[var(--color-darkest)] underline hover:text-[var(--color-medium)]"
                                 >
                                     Habilitar Sig. →
                                 </button>
                             )}
                        </div>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCalendarView = () => (
      <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)] animate-fade-in-up">
           {/* Left: Scrollable List */}
           <div className="flex-1 bg-white/80 border border-slate-200/60 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 bg-white sticky top-0 z-10">
                    <h3 className="text-xl font-bold text-[var(--color-darkest)] mb-4">Programación de Ciclos</h3>
                    <input 
                        type="text" 
                        placeholder="Buscar por mes, fecha o nivel..." 
                        value={calendarSearch}
                        onChange={(e) => setCalendarSearch(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                </div>
                <div className="overflow-y-auto p-6 space-y-4">
                    {filteredCycles.map(cycle => (
                        <div key={cycle.id} className="flex items-center p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all group">
                            <div className={`w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white font-bold shadow-sm mr-4 ${
                                cycle.level === 'INICIAL' ? 'bg-blue-500' : cycle.level === 'AVANZADO' ? 'bg-purple-500' : 'bg-indigo-600'
                            }`}>
                                <span className="text-xs uppercase opacity-80">{cycle.month.substring(0,3)}</span>
                                <span className="text-xl">{cycle.startDate.split('-')[2]}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-slate-800">{cycle.level}</h4>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                                        cycle.status === 'COMPLETED' ? 'bg-slate-100 text-slate-500' :
                                        cycle.status === 'IN_PROGRESS' ? 'bg-emerald-100 text-emerald-600' :
                                        'bg-blue-50 text-blue-600'
                                    }`}>
                                        {cycle.status === 'IN_PROGRESS' ? 'En curso' : cycle.status === 'COMPLETED' ? 'Finalizado' : 'Próximo'}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500">Del {cycle.startDate} al {cycle.endDate}</p>
                                <div className="mt-2 flex items-center text-xs font-medium text-slate-400">
                                    <UsersIcon className="w-4 h-4 mr-1" />
                                    {cycle.enrolledCount} / {cycle.capacity} Inscritos
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredCycles.length === 0 && (
                        <div className="text-center py-12 text-slate-400">No se encontraron ciclos.</div>
                    )}
                </div>
           </div>

           {/* Right: Monthly Summary (Static Mock for now) */}
           <div className="w-full lg:w-80 bg-white/80 border border-slate-200/60 rounded-2xl shadow-sm p-6 h-fit">
                <h3 className="text-lg font-bold text-[var(--color-darkest)] mb-6">Resumen Anual</h3>
                <div className="space-y-6">
                    {[
                        { label: 'Total Ciclos 2024', val: '50' },
                        { label: 'Alumnos Graduados', val: students.filter(s => s.status === 'GRADUATED').length },
                        { label: 'Conflictos Totales', val: students.filter(s => s.status === 'CONFLICT').length, color: 'text-rose-500' }
                    ].map((stat, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <span className="text-slate-500 text-sm">{stat.label}</span>
                            <span className={`font-bold text-lg ${stat.color || 'text-slate-800'}`}>{stat.val}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Meses con Actividad</h4>
                    <div className="grid grid-cols-4 gap-2">
                        {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'].map((m, i) => (
                            <div key={m} className={`text-center text-xs py-2 rounded border ${
                                i < 6 ? 'bg-blue-50 border-blue-200 text-blue-700 font-bold' : 'bg-white border-slate-100 text-slate-300'
                            }`}>
                                {m}
                            </div>
                        ))}
                    </div>
                </div>
           </div>
      </div>
  );

  const renderOverview = () => (
    <div className="space-y-8 animate-fade-in-up">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <div className="bg-white/80 border border-slate-200/60 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Ingresos Totales</p>
                <h3 className="text-3xl font-serif font-bold text-[var(--color-darkest)] mt-2">$245,000</h3>
             </div>
             <div className="bg-white/80 border border-slate-200/60 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Alumnos Activos</p>
                <h3 className="text-3xl font-serif font-bold text-[var(--color-darkest)] mt-2">{students.filter(s => s.status === 'ACTIVE').length}</h3>
             </div>
             <div className="bg-white/80 border border-slate-200/60 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Conflictos</p>
                <h3 className="text-3xl font-serif font-bold text-rose-500 mt-2">{students.filter(s => s.status === 'CONFLICT').length}</h3>
             </div>
              <div className="bg-white/80 border border-slate-200/60 p-6 rounded-2xl shadow-sm">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Solicitudes</p>
                <h3 className="text-3xl font-serif font-bold text-amber-500 mt-2">{registrations.length}</h3>
             </div>
        </div>
        
        <div className="bg-white/80 border border-slate-200/60 p-8 rounded-2xl shadow-sm">
            <h4 className="text-xl font-bold text-[var(--color-darkest)] mb-6">Vista Rápida de Asistencia Hoy</h4>
             <div className="flex items-center justify-center h-40 text-slate-400 italic border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                Gráfico de asistencia en tiempo real próximamente
             </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex">
      {selectedRegistration && renderRegistrationModal()}

      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-[var(--color-darkest)] text-white flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-6 border-b border-blue-900/50 bg-blue-950/30 flex items-center">
             <div className="h-8 w-8 bg-[var(--color-medium)] rounded mr-3 shadow-lg shadow-blue-500/20"></div>
             <span className="font-serif font-bold text-xl hidden lg:block">HOME <span className="text-blue-300 text-sm align-top">Admin</span></span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-[var(--color-medium)] text-white shadow-lg translate-x-1' : 'text-blue-200 hover:bg-white/5'}`}>
            <ChartIcon className="h-6 w-6 lg:mr-3" />
            <span className="hidden lg:block font-medium">Resumen</span>
          </button>
          <button onClick={() => setActiveTab('admissions')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'admissions' ? 'bg-[var(--color-medium)] text-white shadow-lg translate-x-1' : 'text-blue-200 hover:bg-white/5'}`}>
             {/* Using UserIcon as placeholder for Admissions */}
            <UsersIcon className="h-6 w-6 lg:mr-3" /> 
            <span className="hidden lg:block font-medium">Admisiones</span>
            {(registrations.length > 0) && <span className="ml-auto bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{registrations.length}</span>}
          </button>
          <button onClick={() => setActiveTab('students')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'students' ? 'bg-[var(--color-medium)] text-white shadow-lg translate-x-1' : 'text-blue-200 hover:bg-white/5'}`}>
            <UsersIcon className="h-6 w-6 lg:mr-3" />
            <span className="hidden lg:block font-medium">Alumnos</span>
          </button>
          <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center p-3 rounded-xl transition-all ${activeTab === 'calendar' ? 'bg-[var(--color-medium)] text-white shadow-lg translate-x-1' : 'text-blue-200 hover:bg-white/5'}`}>
            <CalendarIcon className="h-6 w-6 lg:mr-3" />
            <span className="hidden lg:block font-medium">Calendario</span>
          </button>
        </nav>

        <div className="p-4 border-t border-blue-900/50 bg-blue-950/30">
          <button onClick={onLogout} className="w-full flex items-center p-3 rounded-xl text-red-300 hover:bg-red-500/20 transition-colors font-medium">
            <LogoutIcon className="h-6 w-6 lg:mr-3" />
            <span className="hidden lg:block">Salir</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-20 lg:ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-10 animate-fade-in-up">
            <div>
                <h1 className="text-4xl font-bold font-serif text-[var(--color-darkest)] tracking-tight">
                    {activeTab === 'overview' && 'Panel de Control'}
                    {activeTab === 'admissions' && 'Admisiones'}
                    {activeTab === 'students' && 'Directorio de Alumnos'}
                    {activeTab === 'calendar' && 'Agenda del Ciclo'}
                </h1>
                <p className="text-slate-500 mt-2 font-medium">
                    {activeTab === 'overview' && 'Bienvenido de vuelta. Aquí está lo que está pasando hoy.'}
                    {activeTab === 'admissions' && 'Gestiona las nuevas solicitudes y pagos.'}
                    {activeTab === 'students' && 'Control de asistencia y progreso académico.'}
                    {activeTab === 'calendar' && 'Cronograma de actividades.'}
                </p>
            </div>
            <div className="flex items-center space-x-4">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-700">Admin User</p>
                    <p className="text-xs text-slate-400">Administrador General</p>
                 </div>
                 <div className="h-12 w-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-[var(--color-darkest)] font-bold text-lg">
                    A
                 </div>
            </div>
        </header>

        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'admissions' && renderAdmissions()}
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'calendar' && renderCalendarView()}
      </main>
    </div>
  );
};

export default AdminDashboard;