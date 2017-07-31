export interface RecoverPasswordDataDTO {
  userId: string;
  token: string;
  password: string;
}

export interface RecoverPasswordSuccessDTO {
    token: string;
}