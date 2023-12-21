import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference, CollectionReference, Query } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Iturno } from '../interfaces/iturnos';

@Injectable({
  providedIn: 'root'
})
export class Turnoservice {
  constructor(private AngFirestore: AngularFirestore) {}

  agregarTurno(turno: Iturno): Promise<DocumentReference<Iturno>> {
    const turnosCollection = this.AngFirestore.collection<Iturno>('turnos');
    return turnosCollection.add(turno).then(docRef => {
      // Actualizar el ID del turno con el ID asignado por Firebase
      return docRef.update({ id: docRef.id }).then(() => docRef);
    });
  }
  

  obtenerTurnos(queryFn?: (ref: CollectionReference<Iturno>) => Query<Iturno>): Observable<Iturno[]> {
    const turnosCollection = this.AngFirestore.collection<Iturno>('turnos');
    const ref = turnosCollection.ref;

    const query = queryFn ? queryFn(ref) : ref;

    return from(query.get().then(querySnapshot => {
      const result: Iturno[] = [];
      querySnapshot.forEach(doc => {
        result.push({ id: doc.id, ...(doc.data() as Iturno) });
      });
      return result;
    }));
  }
  

  editarTurno(id: string, nuevoTurno: Iturno): Promise<void> {
    const turnosCollection = this.AngFirestore.collection<Iturno>('turnos');
    const docRef: DocumentReference<Iturno> = turnosCollection.doc(id).ref;

    return docRef.update(nuevoTurno);
  }
  eliminarTurno(id: string): Promise<void> {
    const turnosCollection = this.AngFirestore.collection<Iturno>('turnos');
    const turnoDoc = turnosCollection.doc(id);
    return turnoDoc.delete();
  }
}