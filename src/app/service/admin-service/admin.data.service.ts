import { Observable } from "rxjs";

export interface AdminDataService<DataType> {
    
    listData(): Observable<DataType[]>;
}