import { redirect } from 'next/navigation'

// The origin root is not part of the public hub (only /ai-search-101/* is
// proxied). Send any direct origin hit to the hub.
export default function Home() {
  redirect('/ai-search-101')
}
