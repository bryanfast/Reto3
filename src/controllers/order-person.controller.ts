import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  Person,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderPersonController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Order.prototype.id,
  ): Promise<Person> {
    return this.orderRepository.person(id);
  }
}
