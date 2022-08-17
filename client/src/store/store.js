import { makeAutoObservable, toJS } from "mobx";
import AuthService from "../services/AuthService";
import CuratorsService from "../services/CuratorsService";
import UsersService from "../services/UsersService";
import ChatBotsService from "../services/ChatBotsService";
import React from "react";
import { useNavigate } from "react-router-dom";

export default class Store {
  isAuth = false;
  isLoading = false;
  Users = [];
  userRole = "";

  flow = "";
  curator = "";

  open = false;
  severity = "success";
  alertMessage = "";

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  setOpen(bool) {
    this.open = bool;
  }

  setSeverity(string) {
    this.severity = string;
  }

  setAlertMessage(string) {
    this.alertMessage = string;
  }

  setUser(string){
    this.userRole = string;
  }

  setFlow(string){
    this.flow = string;
  }

  setCurator(string){
    this.curator = string;
  }

  async login(email, password) {
    const response = await AuthService.login(email, password);
    if (response.status === 200) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("role", response.data.role);
      this.setAuth(true);
    }
    // .catch((error) => {
    //   this.setOpen(true);
    //   this.setSeverity("error");
    //   this.setAlertMessage("Данные введены неверно");
    // });
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      console.log(response);
      localStorage.removeItem("access_token");
      this.setAuth(false);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await AuthService.refresh(access_token);
      if (response.status === 200) {
        this.setAuth(true);
        // localStorage.setItem('access_token', response.data.access_token);
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getCuratorTable(flow, curator) {
    const response = await CuratorsService.getCuratorTable(flow, curator);
    return response.data;
  }

  async getCuratorTableFlows() {
    const response = await CuratorsService.getCuratorTableFlows();
    return response.data;
  }

  async getCuratorTableCurators(flow) {
    const response = await CuratorsService.getCuratorTableCurators(flow);
    return response.data;
  }

  async getUsers() {
    const response = await UsersService.getUsers();
    this.Users = response.data;
    return response.data;
  }

  async addUser(full_name, email, password, role) {
    const response = await UsersService.addUsers(
      full_name,
      email,
      password,
      role
    );
    console.log(response);
    return response.data;
  }

  async deleteUsers(selectedRows) {
    const response = await UsersService.deleteUsers(selectedRows);
    console.log(response);
    return response.data;
  }

  async addChannel(channelName) {
    const response = await ChatBotsService.addChannel(channelName);
    console.log(response);
    return response.data;
  }

  async getChannels() {
    const response = await ChatBotsService.getChannels();
    console.log(response);
    return response.data;
  }

  async addTable(tableName, flow, curator, lessons) {
    const response = await CuratorsService.createCuratorTable(
      tableName,
      flow,
      curator,
      lessons
    );
    console.log(response);
    return response.data;
  }
}
