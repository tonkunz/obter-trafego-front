export interface IProject {
  id?: number;
  titulo: string;
  renovacaoAutomatica: boolean;
  taxaRejeicao: number;
  taxaRetorno: number;
  tempoPagina: number;
  feedUrl: string;
  googleCodigo: string;
  taxaDireto: number;
  taxaReferencia: number;
  taxaOrganica: number;
  taxaDesktop: number;
  taxaMobile: number;
  referencias: [];
  palavras: [];
  localizacoes: [];
  links: [];
}

export class Project implements IProject {
  id?: number;
  titulo: string;
  renovacaoAutomatica: boolean;
  taxaRejeicao: number;
  taxaRetorno: number;
  tempoPagina: number;
  feedUrl: string;
  googleCodigo: string;
  taxaDireto: number;
  taxaReferencia: number;
  taxaOrganica: number;
  taxaDesktop: number;
  taxaMobile: number;
  referencias: [];
  palavras: [];
  localizacoes: [];
  links: [];

  static toJson(data: IProject): any {
    /* eslint-disable */
    return {
      id: data?.id || null,
      titulo: data.titulo,
      renovacao_automatica: data.renovacaoAutomatica,
      taxa_rejeicao: data.taxaRejeicao,
      taxa_retorno: data.taxaRetorno,
      tempo_pagina: data.tempoPagina,
      feed_url: data.feedUrl,
      google_codigo: data.googleCodigo,
      taxa_direto: data.taxaDireto,
      taxa_referencia: data.taxaReferencia,
      taxa_organica: data.taxaOrganica,
      taxa_desktop: data.taxaDesktop,
      taxa_mobile: data.taxaMobile,
      referencias: data.referencias,
      palavras: data.palavras,
      localizacoes: data.localizacoes,
      links: data.links,
    };
    /* eslint-enable */
  }

  static fromJson(data: any): IProject {
    return {
      id: data?.id || 0,
      titulo: data.titulo,
      renovacaoAutomatica: data.renovacao_automatica,
      taxaRejeicao: data.taxa_rejeicao,
      taxaRetorno: data.taxa_retorno,
      tempoPagina: data.tempo_pagina,
      feedUrl: data.feed_url,
      googleCodigo: data.google_codigo,
      taxaDireto: data.taxa_direto,
      taxaReferencia: data.taxa_referencia,
      taxaOrganica: data.taxa_organica,
      taxaDesktop: data.taxa_desktop,
      taxaMobile: data.taxa_mobile,
      referencias: data.referencias,
      palavras: data.palavras,
      localizacoes: data.localizacoes,
      links: data.links,
    };
  }
}

export interface INewProject {
  titulo: string;
  googleCodigo: string;
  siteUrl: string;
}

export class NewProject implements INewProject {
  titulo: string;
  googleCodigo: string;
  siteUrl: string;

  static toJson(data: INewProject): object {
    /* eslint-disable */
    return {
      titulo: data.titulo,
      google_codigo: data.googleCodigo,
      site_url: data.siteUrl,
    };
    /* eslint-enable */
  }

  static fromJson(data: any): INewProject {
    return {
      titulo: data.titulo,
      googleCodigo: data.google_codigo,
      siteUrl: data.site_url,
    };
  }
}

export interface IProjectListItem {
  id: number;
  titulo: string;
  googleCodigo: string;
  inicio: string;
  fim: string;
  plano: string;
  siteUrl: string;
  status: string;
}

export class ProjectListItem implements IProjectListItem {
  id: number;
  titulo: string;
  googleCodigo: string;
  inicio: string;
  fim: string;
  plano: string;
  siteUrl: string;
  status: string;

  static fromJson(data: any): IProjectListItem {
    return {
      id: data.id,
      titulo: data.titulo,
      googleCodigo: data.google_codigo,
      inicio: data.inicio,
      fim: data.fim,
      plano: data.plano,
      siteUrl: data.site_url,
      status: data.status,
    };
  }
}
