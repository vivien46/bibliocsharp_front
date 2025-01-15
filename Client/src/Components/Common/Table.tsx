import React from 'react';

interface TableProps {
    headers: string[];
    data: any[];
    renderRow: (item: any) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, data, renderRow }) => {
    return (
        <table className="border-collapse w-full text-center">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} className="border-b px-4 py-2 bg-gray-100 font-bold">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index} className="border-b">
                        {renderRow(item)}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;