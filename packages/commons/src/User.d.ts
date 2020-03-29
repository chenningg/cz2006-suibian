type User = {
    id?: string;
    username: string;
    isOwner: boolean;
    preferences?: Preference[];
};
