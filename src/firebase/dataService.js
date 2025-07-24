import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// Collection names
const WISHES_COLLECTION = 'birthday-wishes';
const FACTS_COLLECTION = 'nathan-facts';

// Wishes Service
export const wishesService = {
  // Add a new wish
  async addWish(wish) {
    try {
      const docRef = await addDoc(collection(db, WISHES_COLLECTION), {
        ...wish,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...wish };
    } catch (error) {
      console.error('Error adding wish:', error);
      throw error;
    }
  },

  // Get all wishes
  async getWishes() {
    try {
      const q = query(collection(db, WISHES_COLLECTION), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting wishes:', error);
      throw error;
    }
  },

  // Listen to wishes in real-time
  subscribeToWishes(callback) {
    const q = query(collection(db, WISHES_COLLECTION), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const wishes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(wishes);
    });
  },

  // Update a wish
  async updateWish(id, updates) {
    try {
      const wishRef = doc(db, WISHES_COLLECTION, id);
      await updateDoc(wishRef, updates);
      return { id, ...updates };
    } catch (error) {
      console.error('Error updating wish:', error);
      throw error;
    }
  },

  // Delete a wish
  async deleteWish(id) {
    try {
      const wishRef = doc(db, WISHES_COLLECTION, id);
      await deleteDoc(wishRef);
      return id;
    } catch (error) {
      console.error('Error deleting wish:', error);
      throw error;
    }
  }
};

// Facts Service
export const factsService = {
  // Add a new fact
  async addFact(fact) {
    try {
      const docRef = await addDoc(collection(db, FACTS_COLLECTION), {
        ...fact,
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
        addedBy: 'User'
      });
      return { id: docRef.id, ...fact };
    } catch (error) {
      console.error('Error adding fact:', error);
      throw error;
    }
  },

  // Get all facts
  async getFacts() {
    try {
      const q = query(collection(db, FACTS_COLLECTION), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting facts:', error);
      throw error;
    }
  },

  // Listen to facts in real-time
  subscribeToFacts(callback) {
    const q = query(collection(db, FACTS_COLLECTION), orderBy('timestamp', 'desc'));
    return onSnapshot(q, (querySnapshot) => {
      const facts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(facts);
    });
  },

  // Update a fact
  async updateFact(id, updates) {
    try {
      const factRef = doc(db, FACTS_COLLECTION, id);
      await updateDoc(factRef, updates);
      return { id, ...updates };
    } catch (error) {
      console.error('Error updating fact:', error);
      throw error;
    }
  },

  // Delete a fact
  async deleteFact(id) {
    try {
      const factRef = doc(db, FACTS_COLLECTION, id);
      await deleteDoc(factRef);
      return id;
    } catch (error) {
      console.error('Error deleting fact:', error);
      throw error;
    }
  }
};

// Stats Service
export const statsService = {
  async getWishesStats() {
    try {
      const wishes = await wishesService.getWishes();
      return {
        totalWishes: wishes.length,
        uniquePeople: new Set(wishes.map(w => w.name)).size,
        age: 25
      };
    } catch (error) {
      console.error('Error getting wishes stats:', error);
      return { totalWishes: 0, uniquePeople: 0, age: 25 };
    }
  }
}; 