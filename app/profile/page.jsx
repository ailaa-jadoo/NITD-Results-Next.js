// 'use client'

// import { motion } from "framer-motion";
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// import { Accordion, AccordionItem } from "@nextui-org/react";
// import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
// import { Card, CardBody, Divider } from "@nextui-org/react";

// import Shadow from '../../components/Shadow';
// import Pepe from '../../components/Pepe';

// export default function Profile() {
//     const searchParams = useSearchParams();
//     const rollNumber = searchParams.get('rollNumber');

//     const [studentId, setStudentId] = useState('');
//     const [studentSgCgData, setStudentSgCgData] = useState(null);
//     const [studentData, setStudentData] = useState(null);
//     const [gradesData, setGradesData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isContentVisible, setIsContentVisible] = useState(false);
//     const [error, setError] = useState(false);

//     const nums = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"]

//     const fetchData = async () => {
//         try {
//             const response = await fetch(`/api/handleStuId?rollNumber=${rollNumber}`);
//             if (!response.ok) {
//                 setError(true);
//                 throw new Error('Failed to fetch data');
//             }
//             const data = await response.text();
//             setStudentId(data);
            
//             const stuDatanSgCg = await fetch(`/api/handleStuDataNSgSg?studentID=${data}`);
//             if (!stuDatanSgCg.ok) {
//                 setError(true);
//                 throw new Error('Failed to fetch data');
//             }
//             const stuDatanSgCgRes = await stuDatanSgCg.json();
//             const {studentData, sgcgData} = stuDatanSgCgRes;
//             setStudentData(studentData);
//             setStudentSgCgData(sgcgData);
//             const semNum = sgcgData.length;

//             const grades = await fetch(`/api/handleSemGrades?studentID=${data}&semNum=${semNum}`);
//             if (!grades.ok) {
//                 throw new Error('Failed to fetch data');
//             }
//             const gradesData = await grades.json();
//             setGradesData(gradesData);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         } finally {
//             setIsLoading(false);
//             setIsContentVisible(true);
//         }
//     };

//     useEffect(() => {
//         if (rollNumber) {
//             fetchData();
//         }
//     }, [rollNumber]);

//     return (
//         <div className="overflow-x-hidden">
//             <Pepe />

//             {isLoading ? (
//                 <Shadow />
//             ) : (
//                 <Card isBlurred className="border-none max-w-4xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl mx-auto my-4 mt-28" shadow="sm">
//                     <CardBody className="sm:p-3 p-0">
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: isContentVisible ? 1 : 0 }}
//                             transition={{ duration: 1, ease: 'easeInOut' }}
//                         >
//                             <div className="mx-2">
//                                 <Divider className="bg-sky-200 p-[1.5px] rounded-full" />
//                             </div>
//                             <div className="bg-[#18181B] m-2 p-4 rounded-lg shadow-small c400 font-bold text-2xl md:text-3xl">
//                                 Student Details {studentId != 0 && <span className="text-white font-normal text-base md:text-xl">({studentId})</span>}
//                             </div>
//                             <div className="mx-2">
//                                 <Divider className='bg-sky-200 p-[1.5px] rounded-full' />
//                             </div>
//                             {studentData.length > 0 && (
//                                 <div className="bg-[#18181B] m-2 p-4 rounded-lg shadow-small grid md:grid-cols-2 gap-3">
//                                 <p><span className="c400 font-bold">Name -</span> {studentData[0].name}</p>
//                                     <p><span className="c400 font-bold">Roll No. -</span> {studentData[0].registrationno}</p>
//                                     <p><span className="c400 font-bold">Programme -</span> {studentData[0].programme}</p>
//                                     <p><span className="c400 font-bold">Branch -</span> {studentData[0].branch}</p>
//                                 </div>
//                             )}

//                             <div className="mx-2">
//                                 <Divider className='mt-8 bg-sky-200 p-[1.5px] rounded-full' />
//                             </div>
//                             <div className="bg-[#18181B] m-2 p-4 rounded-lg shadow-small c400 font-bold text-2xl md:text-3xl">
//                                 SGPA and CGPA
//                             </div>
//                             <div className="mx-2">
//                                 <Divider className='bg-sky-200 p-[1.5px] rounded-full' />
//                             </div>
//                             {studentSgCgData.length > 0 && (
//                                 <div className="my-2 px-2">
//                                     <Table isStriped className="text-center" >
//                                         <TableHeader className="p-0">
//                                             <TableColumn className="px-2 sm:px-3 text-cyan-400 font-bold text-[14px] text-center">Semester</TableColumn>
//                                             <TableColumn className="px-2 sm:px-3 text-cyan-400 font-bold text-[14px] text-center">SGPA</TableColumn>
//                                             <TableColumn className="px-2 sm:px-3 text-cyan-400 font-bold text-[14px] text-center">CGPA</TableColumn>
//                                             <TableColumn className="px-2 sm:px-3 text-cyan-400 font-bold text-[14px] text-center">Earned Credits</TableColumn>
//                                         </TableHeader>
//                                         <TableBody>
//                                             {studentSgCgData.map((item, index) => (
//                                                 <TableRow key={index}>
//                                                     <TableCell>{item.stynumber}</TableCell>
//                                                     <TableCell>{item.sgpa_r}</TableCell>
//                                                     <TableCell>{item.cgpa_r}</TableCell>
//                                                     <TableCell>{item.totalearnedcredit}</TableCell>
//                                                 </TableRow>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </div>
//                             )}


//                             <div className="mx-2">
//                                 <Divider className='mt-8 bg-sky-200 p-[1.5px] rounded-full' />
//                             </div>
//                             <div className="bg-[#18181B] m-2 p-4 rounded-lg shadow-small c400 font-bold text-2xl md:text-3xl">
//                                 Subject Grades
//                             </div>
//                             <div className="mx-2">
//                                 <Divider className='bg-sky-200 p-[1.5px] rounded-full' />
//                             </div>
//                             {gradesData.length > 0 && (
//                                 <div className="mt-2 mb-7">
//                                     <Accordion variant="splitted">
//                                         {gradesData.map((data, index) => (
//                                             <AccordionItem key={index + 1} aria-label={`Accordion ${index + 1}`} title={`Semester ${nums[index]}`}>
//                                                 <Table removeWrapper isStriped key={index + 1} className="p-0">
//                                                     <TableHeader>
//                                                         <TableColumn className="px-2 sm:px-3 text-cyan-400 font-bold text-[14px]">Subject Code</TableColumn>
//                                                         <TableColumn className="px-2 sm:px-3 text-cyan-400 font-bold text-[14px]">Subject Description</TableColumn>
//                                                         <TableColumn className="px-2 sm:px-3 text-cyan-400 font-bold text-[14px]">Grade</TableColumn>
//                                                     </TableHeader>
//                                                     <TableBody>
//                                                         {data.map((subject, idx) => (
//                                                             <TableRow key={idx}>
//                                                                 <TableCell>{subject.subjectcode}</TableCell>
//                                                                 <TableCell>{subject.subjectdesc}</TableCell>
//                                                                 <TableCell>{subject.grade}</TableCell>
//                                                             </TableRow>
//                                                         ))}
//                                                     </TableBody>
//                                                 </Table>
//                                             </AccordionItem>
//                                         ))}
//                                     </Accordion>
//                                 </div>
//                             )}
//                         </motion.div>
//                     </CardBody>

//                 </Card>
//             )}

//             {/* <Divider/> */}
//         </div>
//     );
// }

// export const revalidate = 3600

import { Suspense } from 'react'
import Profile from './profile';
import {Spinner} from "@nextui-org/react";
 
function SearchBarFallback() {
  return(
    <div className="flex justify-center items-center h-screen">
        <Spinner color="primary" size="lg"/>
    </div>
  )
}
 
export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<SearchBarFallback />}>
          <Profile />
        </Suspense>
      </nav>
      <h1>Dashboard</h1>
    </>
  )
}