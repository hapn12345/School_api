export class IMenu {
    id: Number;
    date: Date;
    menu: {
        breakfast: [string];
        lunch:[string];
        teaTime: [string];
    }
    classID: string;
    public constructor(init?:Partial<IMenu>) {
        Object.assign(this, init);
    }
}