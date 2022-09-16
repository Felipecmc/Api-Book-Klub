export interface IClubRequest {
    name: string,
    description: string,
    admId: string
}

export interface IClub{
    admId: string,
    name: string,
    description: string,
    isActive: boolean,
    createdAt: string,
}