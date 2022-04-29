import { inbox } from "@modules/filters";
import {initFirebaseAuth} from "./modules/auth";
import app from "../firebase-config";

import '/styles/style.scss';
import menuImg from '@images/burger-btn.svg'
import sidebarAddImg from '@images/plus.svg'
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

initFirebaseAuth();

export { db }