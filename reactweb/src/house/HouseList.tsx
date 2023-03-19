import React from 'react'
import config from '../config'
import useFetchHouses from '../hooks/HouseHooks';
import { House } from '../types/house'
import { currencyFormatter } from '../config';
import { useNavigate } from 'react-router-dom';

export default function HouseList() {
    const nav = useNavigate();
    const { data, status, isSuccess } = useFetchHouses();

    return (
        <div>
            <div className="row mb-2">
                <h5 className="themeFontColor text-center">
                    Houses currently on the market
                </h5>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Country</th>
                        <th>Asking Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((h: House) => (
                            <tr key={h.id} onClick={() => nav(`/house/${h.id}`)} >
                                <td>{h.address}</td>
                                <td>{h.country}</td>
                                <td>{currencyFormatter.format(h.price)}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

