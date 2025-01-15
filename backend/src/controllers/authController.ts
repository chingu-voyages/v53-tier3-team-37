import { RequestHandler } from "express";

// we should have multiple login options, Google, Facebook, etc...

export const login: RequestHandler = async (req, res) => {};
export const register: RequestHandler = async (req, res) => {};
export const facebookCallback: RequestHandler = async (req, res) => {};
export const googleCallback: RequestHandler = async (req, res) => {};
