import { useEffect, useState } from "react";
import list from "./list";

const App = () => {
    const [data, setData] = useState(list);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [sortField, setSortField] = useState("");

    useEffect(() => {
        let newData = [...list]
        if (filter != "all") {
            newData = list.filter((item) => item.gender.toLowerCase() == filter);
        }

        if(sortField){
            newData.sort((a, b) => {
                const valA = a[sortField];
                const valB = b[sortField];
                return valA < valB ? 1 : -1;
            });
        }

        setData(newData);
    }, [filter, sortField]);

    const handleChange = (e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
    }

    const handleSearch = (qry) => {
        const newData = list.filter((item) =>
            Object
            .values(item)
            .some((value) => value && value.toString().toLowerCase().includes(qry.toLowerCase())
        ));
        setData(newData);
    }

    const handleFilter = (e) => {
        setFilter(e.target.value);
    }

    const handleSort = (e) => {
        setSortField(e.target.value)
    }

    return (
        <>
            <div className="title">
                <h1 className="text-3xl text-blue-800 my-8 text-center font-semibold">Filter, Sort, Search</h1>
            </div>

            <div className="container flex items-center gap-4 m-auto widgets my-5">
                <div className="w-4/12">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search Name, Email, Roll-no, City..." required onChange={handleChange} value={search} />
                    </div>
                </div>
                <div className="w-4/12">
                    <div>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" onChange={handleFilter}>
                            <option defaultValue value="all" className="text-[15px] text-blue-600 font-semibold">Filter Gender By</option>
                            <option value="all">All</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="w-4/12">
                    <div>
                        <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" onChange={handleSort}>
                            <option defaultValue value="" className="text-[15px] text-blue-600 font-semibold">Sort By</option>
                            <option value="marks">Marks</option>
                            <option value="rollNo">Roll-No</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container m-auto">
                <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-md text-blue-600 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Roll No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Marks
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    City
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 ? data.map((item, idx) => {
                                    return <tr key={idx} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            {idx + 1}.
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.gender}
                                        </td>
                                        <td className={`px-6 py-4 ${sortField == 'rollNo' ? 'text-blue-600 font-semibold' : ''}`}>
                                            {item.rollNo}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>
                                        <td className={`px-6 py-4 ${sortField == 'marks' ? 'text-blue-600 font-semibold' : ''}`}>
                                            <span className="font-semibold">{item.marks}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.city}
                                        </td>
                                    </tr>
                                }) : <tr className="text-lg text-blue-700">
                                    <td className="p-3">No Record Found</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </> 
    )
}

export default App