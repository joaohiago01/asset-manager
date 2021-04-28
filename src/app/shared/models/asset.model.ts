import { estadoConservacao } from './estadoConservacao.enum';
import { Rede } from './rede.model';

export class Asset {
  public id!: number;
  public descricao: string;
  public numeroSerie: string;
  public categoriaId: number;
  public bloco: string;
  public sala: string;
  public estadoConservacao: estadoConservacao;
  public rede: Rede;

  constructor(props: Omit<Asset, 'id'>, id?: number) {
    this.descricao = props.descricao;
    this.numeroSerie = props.numeroSerie;
    this.categoriaId = props.categoriaId;
    this.bloco = props.bloco;
    this.sala = props.sala;
    this.estadoConservacao = props.estadoConservacao;
    this.rede = props.rede;
    if (id != undefined) {
      this.id = id;
    }
  }
}
