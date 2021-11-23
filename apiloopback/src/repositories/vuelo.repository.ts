import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Vuelo, VueloRelations, Ruta} from '../models';
import {RutaRepository} from './ruta.repository';

export class VueloRepository extends DefaultCrudRepository<
  Vuelo,
  typeof Vuelo.prototype.id,
  VueloRelations
> {

  public readonly rutaFk: BelongsToAccessor<Ruta, typeof Vuelo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RutaRepository') protected rutaRepositoryGetter: Getter<RutaRepository>,
  ) {
    super(Vuelo, dataSource);
    this.rutaFk = this.createBelongsToAccessorFor('rutaFk', rutaRepositoryGetter,);
    this.registerInclusionResolver('rutaFk', this.rutaFk.inclusionResolver);
  }
}
