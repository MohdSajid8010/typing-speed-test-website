import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "../FirebaseConfig";
import { toast } from "react-toastify";

export default function getCurrUserData(setCurr_user_data) {
    const { email } = auth.currentUser;
    console.log("current user email=", email)

    const q = query(collection(db, "Results"), where("userEmail", "==", email), orderBy("timeStamp", "desc"));

    getDocs(q).then((snapshot) => {
        let tempData = []
        snapshot.docs.forEach((doc) => {
            tempData.push({ ...doc.data() })
        })
        // console.log(tempData)

        setCurr_user_data(tempData)
    }).catch((err) => {
        console.log(err);
        toast.error("some error occured to get current user data!")

    })
}