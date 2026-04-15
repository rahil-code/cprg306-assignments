import { db } from "../../utils/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export function subscribeToProfiles(userId, callback) {
  const profilesRef = collection(db, "users", userId, "gearProfiles");
  const q = query(profilesRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (querySnapshot) => {
    const profiles = [];
    querySnapshot.forEach((doc) => {
      profiles.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    callback(profiles);
  });
}

export async function addProfile(userId, profile) {
  const profilesRef = collection(db, "users", userId, "gearProfiles");
  const docRef = await addDoc(profilesRef, profile);
  return docRef.id;
}
