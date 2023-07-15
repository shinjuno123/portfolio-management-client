import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { AdminDataService } from "src/app/service/admin-service/admin.data.service";

@Component({
    selector: 'admin-dataedit',
    templateUrl: './dataedit.component.html',
    styleUrls: ['./dataedit.component.css']
})
export class AdminDataEditComponent<T extends { [key: string]: any }, Service extends AdminDataService<T>> implements OnInit {
    faPaperclip = faPaperclip;
    @Input("dataService") dataService!: Service;
    @Input("textProperties") textAreaProperties!:{displayedName: string,name: string,value:string, constraints:any[]}[];
    @Input("textProperties") textProperties!:{displayedName: string,name: string,value:string, constraints:any[]}[];
    @Input("fileProperties") filesProperties!: { name: string, value:string,permittedExtensions: string[] }[];
    @Input("dataProperties") dateProperties!: {displayedName: string, name: string,value:Date}[];
    areFilesPermitted: boolean[] = [];
    @Input("activePropertyName") activeProperty!: { name: string,value: boolean, constraints: any[] };
    @ViewChildren("fileUpload") fileUploads!: QueryList<ElementRef>;
    @ViewChild("activeModalButton") activeModalButton!: ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    formGroup!: FormGroup;
    files: (File | null)[] = [];
    isConfirmed = false;
    id!:string;

    // Input dummy data which has empty values of properties, not fully filled with data
    @Input("data") data!: T;

    constructor(private renderer: Renderer2,
        private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.filesProperties.forEach(() => {
            this.areFilesPermitted.push(false);
            this.files.push(null);
        })

        this.createReactiveForm();

        this.route.queryParams.subscribe({
            // Get id from request parameter
            next: (params: Params) => {
                if (params && params['id']) {
                    const id = params['id'];
                    this.id = id;
                    this.getDataById(id);
                    this.formGroup.setControl("id", new FormControl(id));
                }
            }
        });
    }

    createReactiveForm() {
        // Initialize formGroup
        this.formGroup = new FormGroup({});
        this.formGroup.addControl("id",
            new FormControl("")   
        );

        // Add form controls from text properties
        this.textProperties.forEach(
            (textProperty) => {
                this.formGroup.addControl(textProperty.name,
                    new FormControl(textProperty.value, [...textProperty.constraints])   
                );
            }
        )

        // Add form controls from textarea properties
        this.textAreaProperties.forEach(
            (textAreaProperty) => {
                this.formGroup.addControl(textAreaProperty.name,
                    new FormControl(textAreaProperty.value, [...textAreaProperty.constraints])   
                );
            }
        )

        // Add form controls from file properties
        this.filesProperties.forEach(
            (fileProperty) => {
                this.formGroup.addControl(fileProperty.name,
                    new FormControl(fileProperty.value)   
                );
            }
        )

        // Add form controls from date properties
        this.dateProperties.forEach(
            (dateProperty) => {
                this.formGroup.addControl(dateProperty.name,
                    new FormControl(dateProperty.value)   
                );
            }
        )

        
    }

    getDataById(id: string) {
        if (this.dataService.getDataById !== undefined) {
            this.dataService.getDataById(id).subscribe({
                next: (data) => {
                    // Fill the data from database
                    this.data = data;
                    this.checkIfAllFilesAreAlreadyExist();
                }
            });
        }
    }


    checkIfAllFilesAreAlreadyExist() {
        this.filesProperties.forEach(
            (fileProperty: { name: string,  permittedExtensions: string[] }, index) => {
                // Check if data object exists.
                const filePath: string = this.data[fileProperty.name];
                if (filePath) {
                    // Create dummy file.
                    const file: File = this.createDummyFile(filePath.split("/").at(-1));

                    // Push file to files array
                    this.files[index] = file;

                    // Set file name of variable 'file' to ptag of the attachment view.
                    this.setFileNameToTag(file, this.fileUploads.get(index)?.nativeElement, true);
                }
            }
        )
    }

    createDummyFile(filename: string | undefined) {
        return <File>new File([""], filename ? filename : "fileNameNotFound.any");
    }

    setFileNameToTag(attachment: File, target: HTMLInputElement, isSuccess: boolean, fileType: string = "") {
        const pTag: ChildNode | null = target.nextSibling;

        if (pTag && isSuccess) {
            pTag.textContent = attachment.name.length > 10 ? attachment.name.slice(0, 10) + "..." : attachment.name;
        } else if (pTag && !isSuccess) {
            pTag.textContent = `Please upload your ${fileType} again.`;
        }
    }

    activateThisData() {
        if (this.data[this.activeProperty.name]) {
            this.renderer.selectRootElement(this.activeModalButton.nativeElement).dispatchEvent(new Event('click'));
        }
    }

    cancelActivation<K extends keyof T>() {
        this.updateObjectProperty(<K>this.activeProperty.name, <T[K]>false);
    }

    confirmActivation() {
        this.renderer.selectRootElement(this.closeModelButton.nativeElement).dispatchEvent(new Event('click'));
        this.isConfirmed = true;
    }

    updateObjectProperty<K extends keyof T>(key: K, value: T[K]) {
        this.data[key] = value;
    }

    closeModal<K extends keyof T>() {
        if (this.isConfirmed) {
            this.updateObjectProperty(<K>this.activeProperty.name, <T[K]>true);
            this.isConfirmed = false;
            return;
        }

        this.updateObjectProperty(<K>this.activeProperty.name, <T[K]>false);
    }

    setAttachment(event: Event, index: number) {
        const target = event?.target as HTMLInputElement;
        const files = target.files;

        if (files !== undefined && files !== null && files.length > 0) {
            const attachment: File = files[0];
            let hasToContinue = false;

            const permittedExtensions = this.filesProperties.at(index)?.permittedExtensions;

            if (permittedExtensions !== undefined && permittedExtensions.length > 0) {
                hasToContinue = this.validateFileExtension(attachment, ...permittedExtensions);
                this.areFilesPermitted[index] = !hasToContinue;
                this.files[index] = this.areFilesPermitted[index]? null: attachment;
            }

            if(!hasToContinue) {
                this.setFileNameToTag(attachment, target, false, target.name);
                return;
            }

            this.setFileNameToTag(attachment, target, true);
        }
    }


    validateFileExtension(attachment: File, ...permittedExtensions: string[]): boolean {
        const fileType: string = attachment.type;
        let flag = false;

        permittedExtensions.forEach(
            permittedExtensions => {
                if (fileType === permittedExtensions) {
                    flag = !flag;
                }
            }
        );

        return flag;
    }

    submitForm() {
    }
}