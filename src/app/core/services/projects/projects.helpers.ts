/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/naming-convention */

export function sanitizePutProject(data: any): any {
  return {
    // First Step data sanitize
    titulo: data.titulo,
    projeto_tipo_id: data.projectTypeId,
    google_codigo: data.googleCode,
    site_url: data.siteUrl,
  };
}
