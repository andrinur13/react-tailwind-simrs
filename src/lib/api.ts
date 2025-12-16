// lib/api.ts
"use client";

import { api } from "./axios";

export const AuthAPI = {
  login: async (email: string, password: string) => {
    const res = await api.post("/v2/auth/login", {
        username: email,
        password: password,
    });
    return res.data;
  },
};

export const EmployeeAPI = {
    getList: async (page = 1, perPage = 10) => {
        const res = await api.get("/employees", {
            params: { page, per_page: perPage },
        });
        return res.data;
    },

    getDetail: async (id: string) => {
        const res = await api.get(`/employees/${id}`);
        return res.data;
    },

    create: async (payload: any) => {
        const res = await api.post("/employees", payload);
        return res.data;
    },

    update: async (id: string, payload: any) => {
        const res = await api.put(`/employees/${id}`, payload);
        return res.data;
    },

    delete: async (id: string) => {
        const res = await api.delete(`/employees/${id}`);
        return res.data;
    },

};

export const DepartementAPI = {
    getList: async (page = 1, perPage = 10) => {
        const res = await api.get("/departments", {
            params: { per_page: perPage, page }
        });
        return res.data;
    },

    getDetail: async (id: string) => {
        const res = await api.get(`/departments/${id}`);
        return res.data;
    },

    create: async (payload: any) => {
        const res = await api.post("/departments", payload);
        return res.data;
    },

    update: async (id: string, payload: any) => {
        const res = await api.put(`/departments/${id}`, payload);
        return res.data;
    },

    delete: async (id: string) => {
        const res = await api.delete(`/departments/${id}`);
        return res.data;
    },
};

export const CompetencieAPI = {
    getList: async (page = 1, perPage = 10, search = "") => {
        const res = await api.get("/competencies", {
            params: { per_page: perPage, page, search }
        });
        return res.data;
    },

    getDetail: async (id: string) => {
        const res = await api.get(`/competencies/${id}`);
        return res.data;
    },

    create: async (payload: any) => {
        const res = await api.post("/competencies", payload);
        return res.data;
    },

    update: async (id: string, payload: any) => {
        const res = await api.put(`/competencies/${id}`, payload);
        return res.data;
    },

    delete: async (id: string) => {
        const res = await api.delete(`/competencies/${id}`);
        return res.data;
    },
};

export const TrainingAPI = {
    getList: async (page = 1, perPage = 10, search = "") => {
        const res = await api.get("/trainings", {
            params: { per_page: perPage, page, search },
        });
        return res.data;
    },

    getDetail: async (id: string) => {
        const res = await api.get(`/trainings/${id}`);
        return res.data;
    },

    create: async (payload: any) => {
        const res = await api.post("/trainings", payload);
        return res.data;
    },

    update: async (id: string, payload: any) => {
        const res = await api.put(`/trainings/${id}`, payload);
        return res.data;
    },

    delete: async (id: string) => {
        const res = await api.delete(`/trainings/${id}`);
        return res.data;
    },
};

export const AttendanceAPI = {
    getList: async (page = 1, perPage = 10, search = "") => {
        const res = await api.get("/attendances", {
            params: { per_page: perPage, page, search },
        });
        return res.data;
    },

    getDetail: async (id: string) => {
        const res = await api.get(`/attendances/${id}`);
        return res.data;
    },
};

export const OvertimeAPI = {
    getList: async (page = 1, perPage = 10, search = "") => {
        const res = await api.get("/manager/overtimes", {
            params: { per_page: perPage, page, search },
        });
        return res.data;
    },

    getDetail: async (id: string) => {
        const res = await api.get(`/manager/overtimes/${id}`);
        return res.data;
    },

    create: async (payload: any) => {
        const res = await api.post("/manager/overtimes", payload);
        return res.data;
    },

    update: async (id: string, payload: any) => {
        const res = await api.put(`/manager/overtimes/${id}`, payload);
        return res.data;
    },

    delete: async (id: string) => {
        const res = await api.delete(`/manager/overtimes/${id}`);
        return res.data;
    },
};





