import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { House } from "../types/house";

const useFetchHouses = () => {
    return useQuery<House[], AxiosError>("houses", () =>
        axios.get(`${config.api}/houses`).then((res) => res.data));
}

const useFetchHouse = (id: number) => {
    return useQuery<House, AxiosError>(["house", id], () =>
        axios.get(`${config.api}/house/${id}`).then((res) => res.data));
}

const useAddHouse = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, House>(
        (h) => axios.post(`${config.api}/houses`, h),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("houses");
                nav("/");
            },
        }
    );
};

const useUpdateHouse = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, House>(
        (h) => axios.put(`${config.api}/houses`, h),
        {
            onSuccess: (_, house) => {
                queryClient.invalidateQueries("houses");
                nav(`/house/${house.id}`);
            },
        }
    );
};

const useDeleteHouse = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation<AxiosResponse, AxiosError, House>(
        (h) => axios.delete(`${config.api}/houses/${h.id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("houses");
                nav("/");
            },
        }
    );
};

export {
    useFetchHouses,
    useFetchHouse,
    useAddHouse,
    useUpdateHouse,
    useDeleteHouse,
};

