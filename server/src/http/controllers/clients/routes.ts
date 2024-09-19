import { FastifyInstance } from 'fastify'

import { create } from './create'
import { list } from './list'
import { update } from './update'
import { remove } from './remove'
import { show } from './show'

export async function clientsRoutes(app: FastifyInstance) {
  app.get('/clients', list)

  app.post('/clients', create)
  app.get('/clients/:id', show)
  app.put('/clients/:id', update)
  app.delete('/clients/:id', remove)
}
