import blockContent from './blockContent'
import pillar from './pillar'
import cluster from './cluster'
import article from './article'
import blog from './blog'
import blogAuthor from './blogAuthor'
import blogCategory from './blogCategory'

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
 */
export const schemaTypes = [pillar, cluster, article, blog, blogAuthor, blogCategory, blockContent]
