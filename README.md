# Co-dex
Website: https://codex-seven-ruddy.vercel.app

Overview
---
Codex is a community-based dictionary to share lists of words – from standard dictionaries to made-up languages – amongst friends and family, book clubs, or other communities.

Users can register, login, create private, collaborative, or public dictionaries and share them with others.


Data Model
---
example User:
```
{
	username: "aegon",
	email: jsnow@wall.org,
	passwordHash: //password,
	codices: //array of references to Codex documents
}
```

example Codex:
```
{
	owner: //reference to creator of dictionary
	public: true,
	collaborators: //array of users,
	publicPermissions: "r",
	collaboratorPermissions: "rw",
	name: "Language of GOT",
	words: //array of references to words,
	groups: [
	  {name: "type",
	  options: "noun", "verb", "adj"}, 
	  {name: "tongue",
	  options: "dorthraki, valyrian"}
	],
	likes: 34,
	slug: "language-of-GOT-aegon"
}
```

example Word:
```
{
	owner: //reference to creator of word
	word: "rakh",
	definitions: [
		{definition: "a boy", 
		filters: {type: "-", tongue: "dorthraki"}}
	],
	starred: true,
}
```

example Definition:
```
{
	definition: "a boy", 
	groups: {
	  type: "-", 
	  tongue: "dorthraki"
	}
}
```

<a href = "models/codex.mjs">Link to Codex</a>

<a href = "models/user.mjs">Link to User</a>

### WireFrames
`/login`
![login](images/login.png)

`/directory`
![directory](images/directory.png)

`/directory/slug` - specific public dictionary
![directory slug](images/directory_slug.png)

`/my-codices`
![codices](images/codices.png)

`/my-codices/slug` - specific owned/collaborating dictionary
![codex](images/codex.png)

`/my-codices/slug/settings`
![settings](images/codex-settings.png)

### Site map
![site map](images/sitemap.png)

### User stories/ use cases
1. as a non-registered user, I can register for an account
2. as a non-registered user, I can view a directory of public dictionaries
3. as a user, I can log into the site
4. as a user, I can create new dictionaries
5. as a user, I can edit my dictionaries (CRUD words)
6. (N/A) as a user, I can share dictionaries (or not), with whom I choose
7. (N/A) as a user, I can collaborate with others on a dictionary

### Research topics
- form validation API (3 point)
  - revalidate (next.js library): http://revalidate.jeremyfairbank.com
- configuration (3 points)
- next.js (5 points)
- (N/A) passport.js (server side)
- (N/A) Language APIs