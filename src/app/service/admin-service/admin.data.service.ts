import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page as SpringBuiltInPage } from "src/app/model/spring.page.model";

export interface AdminDataService<DataType, PageType extends SpringBuiltInPage | any = {}, Response extends HttpResponse<Object> | any = {}> {
    
    listData?(): Observable<DataType[]>;

    listPaginatedData?(pageSize: number, pageNumber: number): Observable<PageType>;

    getDataById?(id: string): Observable<DataType>;

    save(data: DataType, files?: (File|null)[], fileProperties?: { name: string, value:string,permittedExtensions: string[] }[]): Observable<Response>;

    update(data: DataType, files?: (File|null)[], fileProperties?: { name: string, value:string,permittedExtensions: string[] }[]): Observable<Response>;

    delete(id: string): Observable<Response>;
}