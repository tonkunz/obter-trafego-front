export interface IProject {
  id?: number;
  titulo: string;
  siteUrl: string;
  renovacaoAutomatica: boolean;
  taxaRejeicao: string;
  taxaRetorno: string;
  tempoPagina: string;
  feedUrl: string;
  googleCodigo: string;
  taxaDireto: string;
  taxaReferencia: string;
  taxaOrganica: string;
  taxaDesktop: string;
  taxaMobile: string;
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
  localizacoes: Localizaco[];
}

export class Project implements IProject {
  id?: number;
  titulo: string;
  siteUrl: string;
  renovacaoAutomatica: boolean;
  taxaRejeicao: string;
  taxaRetorno: string;
  tempoPagina: string;
  feedUrl: string;
  googleCodigo: string;
  taxaDireto: string;
  taxaReferencia: string;
  taxaOrganica: string;
  taxaDesktop: string;
  taxaMobile: string;
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
  localizacoes: Localizaco[];

  static toJson(data: IProject): any {
    /* eslint-disable */
    return {
      id: data.id || null,
      titulo: data.titulo,
      site_url: data.siteUrl,
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
      inicio: data.inicio,
      fim: data.fim,
      status: data.status,
      created_at: data.createdAt,
      updated_at: data.updatedAt,
      deleted_at: data.deletedAt || null,
      projeto_tipo_id: data.projetoTipoId,
      created_by_id: data.createdById,
      projetoTipo: data.projetoTipo,
      referencias: data.referencias,
      palavras: data.palavras,
      links: data.links,
      localizacoes: data.localizacoes,
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

export interface Localizaco {
  id: number;
  cidade: string;
  estado: string;
  taxa: string;
}

//
//
// NewProject Types
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
