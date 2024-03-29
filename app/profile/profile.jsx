'use client'

import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

import { Accordion } from '@mantine/core';
import { Table } from '@mantine/core';
import { Card, CardBody, Divider } from "@nextui-org/react";

import Shadow from '../../components/Shadow';
import Pepe from '../../components/Pepe';

export default function Profile() {
    const searchParams = useSearchParams();
    const rollNumber = searchParams.get('rollNumber');

    const [studentId, setStudentId] = useState('');
    const [studentSgCgData, setStudentSgCgData] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [gradesData, setGradesData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [error, setError] = useState(false);

    const nums = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"]
    const emoji = ["🙂", "🤔", "😐", "😢", "😭", "🥴", "😵‍💫", "💀"]

    const memoizedFetchData = useMemo(() => async () => {
        try {
            const response = await fetch(`/api/handleStuId?rollNumber=${rollNumber}`);
            if (!response.ok) {
                setError(true);
                throw new Error('Failed to fetch data');
            }
            const data = await response.text();
            setStudentId(data);
            const stuDatanSgCg = await fetch(`/api/handleStuDataNSgSg?studentID=${data}`);
            if (!stuDatanSgCg.ok) {
                setError(true);
                throw new Error('Failed to fetch data');
            }
            const stuDatanSgCgRes = await stuDatanSgCg.json();
            const { studentData, sgcgData } = stuDatanSgCgRes;
            setStudentData(studentData);
            setStudentSgCgData(sgcgData);
            const semNum = sgcgData.length;
            const grades = await fetch(`/api/handleSemGrades?studentID=${data}&semNum=${semNum}`);
            if (!grades.ok) {
                throw new Error('Failed to fetch data');
            }
            const gradesData = await grades.json();
            setGradesData(gradesData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
            setIsContentVisible(true);
        }
    }, [rollNumber]);

    useEffect(() => {
        if (rollNumber) {
          memoizedFetchData();
        }
      }, [rollNumber, memoizedFetchData]);

    return (
        <div className="overflow-x-hidden">
            <Pepe />

            {isLoading ? (
                <Shadow />
            ) : (
                <Card isBlurred className="border-none max-w-4xl lg:max-w-4xl md:max-w-3xl sm:max-w-xl mx-auto my-4 mt-28" shadow="sm">
                    <CardBody className="sm:p-3 p-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isContentVisible ? 1 : 0 }}
                            transition={{ duration: 1, ease: 'easeInOut' }}
                        >
                            <div className="mx-2">
                                <Divider className="bg-sky-200 p-[1.5px] rounded-full" />
                            </div>
                            <div className="bg-[#18181B] m-2 p-4 rounded-lg shadow-small c400 font-bold text-2xl md:text-3xl">
                                Student Details {studentId != 0 && <span className="text-white font-normal text-base md:text-xl">({studentId})</span>}
                            </div>
                            <div className="mx-2">
                                <Divider className='bg-sky-200 p-[1.5px] rounded-full' />
                            </div>
                            {studentData.length > 0 && (
                                <div className="bg-[#18181B] m-2 p-4 rounded-lg shadow-small grid md:grid-cols-2 gap-3">
                                    <p><span className="c400 font-bold">Name -</span> {studentData[0].name.toLowerCase().replace(/(^|\s)\S/g, char => char.toUpperCase())}</p>
                                    <p><span className="c400 font-bold">Roll No. -</span> {studentData[0].registrationno}</p>
                                    <p><span className="c400 font-bold">Programme -</span> {studentData[0].programme}</p>
                                    <p><span className="c400 font-bold">Branch -</span> {studentData[0].branch}</p>
                                </div>
                            )}



                            {studentSgCgData.length < 1 ? (
                                <>
                                    <div className="mx-2">
                                        <Divider className='mt-8 bg-warning p-[1.5px] rounded-full' />
                                    </div>
                                    <div className="bg-[#18181B] m-2 p-4 rounded-lg shadow-small text-warning font-bold text-2xl md:text-3xl text-center">
                                        No Data Sedly ;_;
                                    </div>
                                    <div className="mx-2">
                                        <Divider className='bg-warning p-[1.5px] rounded-full' />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="mx-2">
                                        <Divider className='mt-8 bg-sky-200 p-[1.5px] rounded-full' />
                                    </div>
                                    <div className="bg-[#18181B] m-2 p-4 rounded-lg shadow-small c400 font-bold text-2xl md:text-3xl">
                                        SGPA and CGPA
                                    </div>
                                    <div className="mx-2">
                                        <Divider className='bg-sky-200 p-[1.5px] rounded-full' />
                                    </div>
                                    {studentSgCgData.length > 0 && (

                                        <div className="bg-[#18181B] mx-2 mt-2 p-4 rounded-lg shadow-small">
                                            <Table striped highlightOnHover className="text-center" withRowBorders={false} verticalSpacing="sm">
                                                <Table.Thead>
                                                    <Table.Tr>
                                                        <Table.Th className="md:text-lg text-cyan-400 font-bold text-[14px] text-center">Semester</Table.Th>
                                                        <Table.Th className="md:text-lg text-cyan-400 font-bold text-[14px] text-center">SGPA</Table.Th>
                                                        <Table.Th className="md:text-lg text-cyan-400 font-bold text-[14px] text-center">CGPA</Table.Th>
                                                        <Table.Th className="md:text-lg text-cyan-400 font-bold text-[14px] text-center">Earned Credits</Table.Th>
                                                    </Table.Tr>
                                                </Table.Thead>
                                                <Table.Tbody>
                                                    {studentSgCgData.map((item, index) => (
                                                        <Table.Tr key={index} className="md:text-base">
                                                            <Table.Td>{item.stynumber}</Table.Td>
                                                            <Table.Td>{item.sgpa_r}</Table.Td>
                                                            <Table.Td>{item.cgpa_r}</Table.Td>
                                                            <Table.Td>{item.totalearnedcredit}</Table.Td>
                                                        </Table.Tr>
                                                    ))}
                                                </Table.Tbody>
                                            </Table>
                                        </div>
                                    )}


                                    <div className="mx-2">
                                        <Divider className='mt-8 bg-sky-200 p-[1.5px] rounded-full' />
                                    </div>
                                    <div className="bg-[#18181B] m-2 p-4 rounded-lg shadow-small c400 font-bold text-2xl md:text-3xl">
                                        Subject Grades
                                    </div>
                                    <div className="mx-2">
                                        <Divider className='bg-sky-200 p-[1.5px] rounded-full' />
                                    </div>
                                    {gradesData.length > 0 && (
                                        <div className="mt-2 mb-7 mx-2">
                                            <Accordion variant="separated" radius="md" className="bg-[#18181B] p-4 rounded-lg shadow-small">
                                                {gradesData.map((data, index) => (
                                                    <Accordion.Item key={index} value={`${nums[index]}`} className="border-none">
                                                        <Accordion.Control className="" icon={emoji[index]}>Semester {nums[index]}</Accordion.Control>
                                                        <Accordion.Panel className="break-normal ">
                                                            <Table striped highlightOnHover withRowBorders={false} className="" verticalSpacing="sm">
                                                                <Table.Thead>
                                                                    <Table.Tr>
                                                                        <Table.Th className="md:text-lg text-cyan-400 font-bold text-[14px]">Subject Code</Table.Th>
                                                                        <Table.Th className="md:text-lg text-cyan-400 font-bold text-[14px]">Subject Description</Table.Th>
                                                                        <Table.Th className="md:text-lg text-cyan-400 font-bold text-[14px]">Grade</Table.Th>
                                                                    </Table.Tr>
                                                                </Table.Thead>
                                                                <Table.Tbody>
                                                                    {data.map((subject, idx) => (
                                                                        <Table.Tr key={idx} className="md:text-base">
                                                                            <Table.Td>{subject.subjectcode}</Table.Td>
                                                                            <Table.Td>{subject.subjectdesc}</Table.Td>
                                                                            <Table.Td className={subject.grade === 'F' ? 'text-danger font-bold' : ''}>{subject.grade}</Table.Td>
                                                                        </Table.Tr>
                                                                    ))}
                                                                </Table.Tbody>
                                                            </Table>
                                                        </Accordion.Panel>
                                                    </Accordion.Item>
                                                ))}
                                            </Accordion>
                                        </div>
                                    )}
                                </>
                            )}

                        </motion.div>
                    </CardBody>

                </Card>
            )}
        </div>
    );
}

export const revalidate = 3600