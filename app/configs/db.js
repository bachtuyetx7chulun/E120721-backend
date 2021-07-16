"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = __importDefault(require("firebase"));
var firebaseConfig = {
    apiKey: 'AIzaSyBfSKb6hwtvMqWSvAfBqkBRScJVutS98lw',
    authDomain: 'e120721.firebaseapp.com',
    databaseURL: 'https://e120721-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'e120721',
    storageBucket: 'e120721.appspot.com',
    messagingSenderId: '331663342600',
    appId: '1:331663342600:web:2249c40894a96b8bab25bd',
    measurementId: 'G-8NTXL6PY3N',
};
firebase_1.default.initializeApp(firebaseConfig);
exports.default = firebase_1.default.database();
