import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';

export class ApolloClientManager {

	apolloClient: any;

	constructor(apollo: Apollo,
		httpLink: HttpLink) {
		apollo.create({
			link: httpLink.create({ uri: 'http://localhost:3000' }),
			cache: new InMemoryCache()
		});
	}

	provideClient(): any {
		return this.apolloClient;
	}
}
