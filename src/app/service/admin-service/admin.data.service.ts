import { Observable } from "rxjs";
import { Page as SpringBuiltInPage } from "src/app/model/spring.page.model";

export interface AdminDataService<DataType, PageType extends SpringBuiltInPage | any = {}> {
    
    listData?(): Observable<DataType[]>;

    listPaginatedData?(pageSize: number, pageNumber: number): Observable<PageType>;
}