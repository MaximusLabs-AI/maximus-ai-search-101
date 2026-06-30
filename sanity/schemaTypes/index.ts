import blockContent from './blockContent'
import pillar from './pillar'
import cluster from './cluster'
import article from './article'

/**
 * Register these in sanity.config.ts:
 *   import {schemaTypes} from './schemas'
 *   schema: { types: schemaTypes }
 *
 * The 4-level structure is modeled as a reference chain:
 *   article.cluster -> cluster   (Level 4 -> Level 3)
 *   cluster.pillar  -> pillar    (Level 3 -> Level 2)
 *   article.pillar  -> pillar    (denormalized for fast path/breadcrumb)
 * Level 1 (the hub) is the static index route; it lists all pillars.
 *
 * Maxint (Maximus CMS) blogs are synced INTO `article` (under pillar -> cluster),
 * so there are no separate blog/author/category document types — those were
 * removed; only pillar, cluster, and article are modeled here.
 */
export const schemaTypes = [pillar, cluster, article, blockContent]
