import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ruta, RutaRelations, Aeropuerto} from '../models';
import {AeropuertoRepository} from './aeropuerto.repository';

export class RutaRepository extends DefaultCrudRepository<
  Ruta,
  typeof Ruta.prototype.id,
  RutaRelations
> {

  public readonly origenFk: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  public readonly destinoFk: BelongsToAccessor<Aeropuerto, typeof Ruta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AeropuertoRepository') protected aeropuertoRepositoryGetter: Getter<AeropuertoRepository>,
  ) {
    super(Ruta, dataSource);
    this.destinoFk = this.createBelongsToAccessorFor('destinoFk', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('destinoFk', this.destinoFk.inclusionResolver);

    this.origenFk = this.createBelongsToAccessorFor('origenFk', aeropuertoRepositoryGetter,);
    this.registerInclusionResolver('origenFk', this.origenFk.inclusionResolver);
  }
}
