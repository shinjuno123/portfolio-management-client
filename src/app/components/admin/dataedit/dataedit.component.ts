import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { RegularPropertyInformation } from "src/app/model/common/regular.property.information.model";
import { AdminDataService } from "src/app/service/admin-service/admin.data.service";
import { environment } from "src/environments/environment";

@Component({
    selector: 'admin-dataedit',
    templateUrl: './dataedit.component.html',
    styleUrls: ['./dataedit.component.css']
})
export class AdminDataEditComponent<K extends keyof T,T extends { [key: string]: any }, Service extends AdminDataService<T>> implements OnInit {
    faPaperclip = faPaperclip;
    @Input("routeLinkToListPage") routeLinkToListPage!: string;
    @Input("editPageName") editPageName!: string;
    @Input("dataService") dataService!: Service;
    @Input("textAreaProperties") textAreaProperties!:RegularPropertyInformation[];
    @Input("textProperties") textProperties!:RegularPropertyInformation[];
    @Input("filesProperties") filesProperties!: { name: string, value:string,permittedExtensions: string[] }[];
    @Input("dataProperties") dateProperties!: RegularPropertyInformation[];
    @Input("checkBoxProperties") checkBoxProperties!: RegularPropertyInformation[];
    @Input("versionProperties") versionProperties!: RegularPropertyInformation[];
    areFilesPermitted: boolean[] = [];
    @Input("activeProperty") activeProperty!: RegularPropertyInformation;
    @ViewChildren("fileUpload") fileUploads!: QueryList<ElementRef>;
    @ViewChild("activeModalButton") activeModalButton!: ElementRef;
    @ViewChild('closeModalButton') closeModelButton!: ElementRef;
    @ViewChild('deleteModalButton') deleteModalButton!: ElementRef;
    formGroup = new FormGroup({});
    files: (File | null)[] = [];
    isConfirmed = false;
    id!:string;

    // Input dummy data which has empty values of properties, not fully filled with data
    @Input("data") data!: T;

    constructor(private renderer: Renderer2,
        private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        if(this.filesProperties) {
            this.filesProperties.forEach(() => {
                this.areFilesPermitted.push(false);
                this.files.push(null);
            })
        }

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
        this.formGroup.addControl("id",
            new FormControl("")   
        );

        // Add form controls from text properties
        if(this.textProperties) {
            this.textProperties.forEach(
                (textProperty) => {
                    this.formGroup.addControl(textProperty.name,
                        new FormControl(textProperty.value, [...textProperty.constraints])   
                    );
                }
            )
        }

        // Add form controls from textarea properties
        if(this.textAreaProperties) {
            this.textAreaProperties.forEach(
                (textAreaProperty) => {
                    this.formGroup.addControl(textAreaProperty.name,
                        new FormControl(textAreaProperty.value, [...textAreaProperty.constraints])   
                    );
                }
            )    
        }
        // Add form controls from file properties
        if(this.filesProperties) {
            this.filesProperties.forEach(
                (fileProperty) => {
                    this.formGroup.addControl(fileProperty.name,
                        new FormControl(fileProperty.value)   
                    );
                }
            )
        }

        // Add form controls from date properties
        if(this.dateProperties) {
            this.dateProperties.forEach(
                (dateProperty) => {
                    this.formGroup.addControl(dateProperty.name,
                        new FormControl(dateProperty.value)   
                    );
                }
            )    
        }

        // Add form controls from activeProperty
        if(this.activeProperty) {
            this.formGroup.addControl(this.activeProperty.name,
                new FormControl(this.activeProperty.value, [...this.activeProperty.constraints])
            );
        }

        if(this.checkBoxProperties) {
            this.checkBoxProperties.forEach(
                (checkboxProperty) => {
                    this.formGroup.addControl(checkboxProperty.name,
                        new FormControl(checkboxProperty.value)   
                    );
                }
            )
        }

        if(this.versionProperties) {
            this.versionProperties.forEach(
                (versionProperty) => {
                    this.formGroup.addControl(versionProperty.name,
                        new FormControl(versionProperty.value)
                    );
                }
            )
        }
        
    }

    getDataById(id: string) {
        if (this.dataService.getDataById !== undefined) {
            this.dataService.getDataById(id).subscribe({
                next: (data) => {
                    // Fill the data from database
                    this.data = data;
                    this.checkIfAllFilesAreAlreadyExist();
                    this.setReactiveForm();
                }
            });
        }
    }

    setReactiveForm() {
        Object.keys(this.data).forEach(
            (key) => {
                const control = this.formGroup.get(key);
                if(control) {
                    control.setValue(this.data[key]);
                    this.formGroup.setControl(key,  control);
                }
            }
        )
    }

    checkIfAllFilesAreAlreadyExist() {
        if(this.filesProperties) {
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

    activateThisData(activeProperty: RegularPropertyInformation) {
        if (this.formGroup.get(activeProperty.name)?.value) {
            this.renderer.selectRootElement(this.activeModalButton.nativeElement).dispatchEvent(new Event('click'));
        }
    }

    cancelActivation() {
        this.updateObjectProperty(<K>this.activeProperty.name, <T[K]>false);
        this.formGroup.get(this.activeProperty.name)?.setValue(false);
    }

    confirmActivation() {
        this.renderer.selectRootElement(this.closeModelButton.nativeElement).dispatchEvent(new Event('click'));
        this.isConfirmed = true;
    }

    updateObjectProperty(key: K, value: T[K]) {
        this.data[key] = value;
    }

    closeModal() {
        if (this.isConfirmed) {
            this.updateObjectProperty(<K>this.activeProperty.name, <T[K]>true);
            this.isConfirmed = false;
            return;
        }

        this.updateObjectProperty(<K>this.activeProperty.name, <T[K]>false);
    }

    setAttachment(event: Event, index: number, fileProperty: { name: string, value:string,permittedExtensions: string[]}) {
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

    checkIfEmptyFileExists() {
        let isEmpty = false;

        this.files.forEach(
            (file) => {
                if(file === null) {
                    isEmpty = true;
                }
            }
        )

        return isEmpty;
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

    submitForm(){
        const dataClone: T = <T> this.formGroup.value;
        this.data = dataClone;

        this.dateProperties.forEach(
            (dataProperty) => {
                if(dataProperty.name === "updated") {
                    this.updateObjectProperty(<K> dataProperty.name ,<T[K]> null);
                }
        
            }
        )

        if(this.id) {
            this.update(this.data, this.files);
        } else {
            this.save(this.data, this.files);
        }

    }

    save(data:T, files: (File|null)[]) {
        this.dataService.save(data, files, this.filesProperties).subscribe({
            next:() => {
                this.router.navigate([this.routeLinkToListPage],{queryParams:{saveSuccess:true},relativeTo: this.route} );
            },

            error: () => {
                this.router.navigate([this.routeLinkToListPage],{queryParams:{saveSuccess:false},relativeTo: this.route});
            }
        })
    }

    update(data:T, files: (File|null)[]) {
        this.dataService.update(data, files, this.filesProperties).subscribe({
            next:() => {
                this.router.navigate([this.routeLinkToListPage],{queryParams:{updateSuccess:true},relativeTo: this.route} );
            },

            error: () => {
                this.router.navigate([this.routeLinkToListPage],{queryParams:{updateSuccess:false},relativeTo: this.route} );
            }
        })
    }

    reviewFile(fileName: string) {
        let filePath: string = '';

        if(fileName) {
            filePath = <string> this.data[fileName as keyof T];
        }

        window.open(environment.rootUrl + filePath);
    }

    openDeleteModal() {
        this.renderer.selectRootElement(this.deleteModalButton.nativeElement).dispatchEvent(new Event('click'));
    }

    deleteThis() {
        this.dataService.delete(this.id)
            .subscribe({
                next: () => {
                    this.router.navigate([this.routeLinkToListPage],{queryParams:{deleteSuccess:true},relativeTo: this.route});
                },
                error: () => {
                    this.router.navigate([this.routeLinkToListPage],{queryParams:{deleteSuccess:false},relativeTo: this.route});
                }
            
            })
    }
}