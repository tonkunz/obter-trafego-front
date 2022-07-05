export interface IBasicSettingsData {
  renovacaoAutomatica: boolean;
  taxaRejeicao: number;
  taxaRetorno: number;
  tempoPagina: string;
}

export interface ITargetSettingsData {
  taxaDesktop: number;
  taxaMobile: number;
  taxaOrganica: number;
  taxaDireto: number;
  taxaReferencia: number;
}
