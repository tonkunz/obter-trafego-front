export interface IProject {
  id?: number;
  titulo: string;
  siteUrl: string;
  renovacaoAutomatica: boolean;
  taxaRejeicao: number;
  taxaRetorno: number;
  tempoPagina: string;
  feedUrl: string;
  googleCodigo: string;
  taxaDireto: number;
  taxaReferencia: number;
  taxaOrganica: number;
  taxaDesktop: number;
  taxaMobile: number;
  inicio: string;
  fim: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  projetoTipoId: number;
  createdById: number;
  projetoTipo: ProjetoTipo[];
  referencias: Referencia[];
  palavras: Palavra[];
  links: Link[];
  localizacoes: ILocalizacao[];
}

export class Project implements IProject {
  id?: number;
  titulo: string;
  siteUrl: string;
  renovacaoAutomatica: boolean;
  taxaRejeicao: number;
  taxaRetorno: number;
  tempoPagina: string;
  feedUrl: string;
  googleCodigo: string;
  taxaDireto: number;
  taxaReferencia: number;
  taxaOrganica: number;
  taxaDesktop: number;
  taxaMobile: number;
  inicio: string;
  fim: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  projetoTipoId: number;
  createdById: number;
  projetoTipo: ProjetoTipo[];
  referencias: Referencia[];
  palavras: Palavra[];
  links: Link[];
  localizacoes: ILocalizacao[];

  constructor() {
    this.id = null;
    this.titulo = '';
    this.siteUrl = '';
    this.renovacaoAutomatica = false;
    this.taxaRejeicao = 0;
    this.taxaRetorno = 0;
    this.tempoPagina = '';
    this.feedUrl = '';
    this.googleCodigo = '';
    this.taxaDireto = 0;
    this.taxaReferencia = 0;
    this.taxaOrganica = 0;
    this.taxaDesktop = 0;
    this.taxaMobile = 0;
    this.inicio = '';
    this.fim = '';
    this.status = '';
    this.createdAt = '';
    this.updatedAt = '';
    this.deletedAt = '';
    this.projetoTipoId = 0;
    this.createdById = 0;
    this.projetoTipo = [];
    this.referencias = [];
    this.palavras = [];
    this.links = [];
    this.localizacoes = [];
  }

  static toJson(data: IProject): any {
    /* eslint-disable */
    return {
      id: data.id || null,
      titulo: data.titulo,
      site_url: data.siteUrl,
      renovacao_automatica: data.renovacaoAutomatica || false,
      taxa_rejeicao: data.taxaRejeicao || '0',
      taxa_retorno: data.taxaRetorno || '0',
      tempo_pagina: data.tempoPagina || '0',
      feed_url: data.feedUrl || '',
      google_codigo: data.googleCodigo,
      taxa_direto: data.taxaDireto || '0',
      taxa_referencia: data.taxaReferencia || '0',
      taxa_organica: data.taxaOrganica || '0',
      taxa_desktop: data.taxaDesktop || '0',
      taxa_mobile: data.taxaMobile || '0',
      inicio: data.inicio,
      fim: data.fim,
      status: data.status,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
      deleted_at: data.deletedAt || null,
      projeto_tipo_id: data.projetoTipoId,
      created_by_id: data.createdById,
      projetoTipo: data.projetoTipo,
      referencias: data.referencias || [],
      palavras: data.palavras || [],
      links: data.links || [],
      localizacoes: data.localizacoes || [],
    };
    /* eslint-enable */
  }

  static fromJson(data: any): IProject {
    return {
      id: data.id || null,
      titulo: data.titulo,
      siteUrl: data.site_url,
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
      inicio: data.inicio,
      fim: data.fim,
      status: data.status,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      deletedAt: data.deleted_at || null,
      projetoTipoId: data.projeto_tipo_id,
      createdById: data.created_by_id,
      projetoTipo: data.projetoTipo,
      referencias: data.referencias,
      palavras: data.palavras,
      links: data.links,
      localizacoes: data.localizacoes,
    };
  }
}

export interface ProjetoTipo {
  nome: string;
  acessos: number;
}

export interface Referencia {
  url: string;
  taxa: string;
}

export interface Palavra {
  termo: string;
  taxa: string;
}

export interface Link {
  url: string;
}

export interface ILocalizacao {
  id: number;
  cidade: string;
  estado: string;
  taxa?: number;
  busca?: string;
}

//
//
// NewProject Types
export interface INewProject {
  titulo: string;
  googleCodigo: string;
  siteUrl: string;
  projectTypeId: number;
}

export class NewProject implements INewProject {
  titulo: string;
  googleCodigo: string;
  siteUrl: string;
  projectTypeId: number;

  static toJson(data: INewProject): object {
    /* eslint-disable */
    return {
      titulo: data.titulo,
      google_codigo: data.googleCodigo,
      site_url: data.siteUrl,
      projeto_tipo_id: data.projectTypeId,
    };
    /* eslint-enable */
  }

  static fromJson(data: any): INewProject {
    return {
      titulo: data.titulo,
      googleCodigo: data.google_codigo,
      siteUrl: data.site_url,
      projectTypeId: data.projeto_tipo_id,
    };
  }
}

//
//
// ProjectListItem
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
