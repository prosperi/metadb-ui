// mock database!

export const schema = {
	'title.english': {},
	'title.chinese': {},
	'title.japanese': {},
 	'title.korean': {},
 	'subject.ocm': {
 		controlledVocab: true,
 		multipleValues: true,
 		vocabulary: 'subject.ocm',
 	},
 	'description.critical': {
 		largerField: true,
 	},
 	'description.text.english': {
 		largerField: true,
 	},
 	'description.text.japanese': {
 		largerField: true,
 	},
 	'description.inscription.english': {
 		largerField: true,
 	},
 	'description.inscription.japanese': {
 		largerField: true,
 	},
 	'description.ethnicity': {},
 	'coverage.location.country': {
 		multipleValues: true,
 	},
 	'coverage.location': {
 		multipleValues: true,
 	},
 	'format.medium': {},
 	'description.indicia': {},
 	'creator.maker': {
 		multipleValues: true,
 	},
 	'creator.company': {
 		multipleValues: true,
 	},
 	'description.citation': {},
 	'relation.seeAlso': {
 		multipleValues: true,
 	},
 	'contributor': {
 		multipleValues: true,
 	},
 	'date.original': {},
 	'date.artifact.upper': {},
 	'date.artifact.lower': {},
 	'date.search': {},
 	'format.extant': {
 		multipleValues: true,
 	},
 	'relation.isPartOf': {
 		multipleValues: true,
 	},
 	'format.digital': {
 		largerField: true,
 	},
 	'publisher.digital':{
 		largerField: true,
 	},
 	'rights.digital': {
 		largerField: true,
 	},
 	'creator.digital': {
 		largerField: true,
 	}
}

export const works = [
	{
		id: 'nf0001',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0001-300.jpg',
		title: '[nf0001] Taiwan',
		metadata: {
			'title.english': ['[nf0001] Taiwan'],
			'title.chinese': [],
			'title.japanese': ['台湾の風光 [Taiwan no fūkō̄]'],
			'title.korean': [],
			'subject.ocm': [
				'214 PUBLISHING',
			],
			'description.critical': [
				`The author, date, and place of publication are missing from the two copies of this book at hand. The album digitized herein is in the editor's possession; the other was borrowed from Stanford University via interlibrary loan for purposes of comparison. The bibliographic information in Stanford's on-line catalog [incorrectly] estimates the date of publication at 1931 (the album contains printed dates from 1933 and 1938). The Stanford Library database does not identify the editor. However, the Stanford database identifies Yamazaki Kin'ichirō 山崎鋆一郎 as editor of _Taiwan no tenbō (1932)_ . According to the Japanese National Diet Library database, both of these pictorial works were edited by the same man, Yamazaki Kaneichirō 山崎〓一郎 (the symbol 〓 represents a non-standard character; the NDL database does not indicate the actual character). The NDL reads Yamazaki's personal name as ""Kane'ichirō"" カネイチロウ, in contrast to Stanford's reading Kin'ichirō.  We are using the NDL reading, "Kaneichirō."  The date-of-publication is 1934 in the NDL entry, which is plausible for the Stanford University copy of this album, which contains no marks or stamps more recent than 1933. However, the version digitized herein includes censor's permits, burned into the negatives, that are dated 1938. Significantly, these items marked 1938 (four total) are not included in the Stanford copy. The later edition's four missing images were of an airbase in Pingdong, an aerial view of Gaoxiong City, a bridge in Pingdong, and a loading dock in Gaoxiong Harbor. These may have been removed from the later edition due to concerns about national security in the wake of the Marco Polo Bridge incident of 1937. Apparently, images from Gaoxiong, a vital port city, were sensitive to Japanese authorities. These four censored images, and the map from the earlier edition, have been scanned and appended, with appropriate citations. Based on the 1938 censor's stamps, we estimate the date of publication for the album digitized herein as 1939, assuming an interval between the vetting of materials and publication similar to that of the Stanford/Hoover Institute copy.`
			],
			'description.text.english': [],
			'description.text.japanese': [],
			'description.inscription.english': [],
			'description.inscription.japanese': [
				`[brush writing] 台湾基隆　許重＿　字若隠　所蔵`
			],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': [],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': [],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
	{
		id: 'nf0002',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0002-300.jpg',
		title: '[nf0002] [Ex libris..., Jilong, Taiwan]',
		metadata: {
			'title.english': ['[nf0002] [Ex libris..., Jilong, Taiwan]'],
			'title.chinese': [],
			'title.japanese': ['台湾の風光'],
			'title.korean': [],
			'subject.ocm': [
				'213 PRINTING',
			],
			'description.critical': [
				`Ink-brush calligraphy documenting ownership of item. Owner is apparently a resident of Jilong named Xu (surname).`
			],
			'description.text.english': [],
			'description.text.japanese': [],
			'description.inscription.english': [],
			'description.inscription.japanese': [
				`[brush writing] 台湾基隆　許重＿　字若隠　所蔵`
			],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': [],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': [],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
	{
		id: 'nf0003',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0003-300.jpg',
		title: '[nf0003] [Scenic Taiwan]',
		metadata: {
			'title.english': ['[nf0003] [Scenic Taiwan]'],
			'title.chinese': [],
			'title.japanese': ['台湾の風光'],
			'title.korean': [],
			'subject.ocm': [
				'213 PRINTING',
			],
			'description.critical': [
				`Title Page`
			],
			'description.text.english': [],
			'description.text.japanese': [],
			'description.inscription.english': [],
			'description.inscription.japanese': [],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': [],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': [],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
	{
		id: 'nf0004',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0004-300.jpg',
		title: '[nf0004] [Preface]',
		metadata: {
			'title.english': ['[nf0004] [Preface]'],
			'title.chinese': [],
			'title.japanese': ['目次'],
			'title.korean': [],
			'subject.ocm': [
				'214 PUBLISHING',
			],
			'description.critical': [
				`Preface to the photo collection`
			],
			'description.text.english': [
				`Taiwanese history is extremely new. Until the Dutch occupied the island in 1624, it was mostly left to the mercies of savages, and as such, this orphaned island served as a stronghold for pirates in some places, and a landing place for ships in distress. Around 1600 the name Taiwan was born from a corruption of the local language, a name without any meaning. Nevertheless, Taiwan has been connected to Japan since times of old: Hideyoshi invited the islanders to pay tribute; the Vermilion Seal ships crossed to Taiwan; Hamada Yahyoe's heroic exploits [occured there]; and, Taiwan was occupied by Zheng Chenggong, whose mother was Japanese. Moreover, in 1871, Ryukyu islanders accidentally drifted ashore and were massacred, bringing about a debate regarding a punitive expedition. As a result, Commander Saigo, an advocate of action, led the Taiwan Expedition. Taiwan at long last became Japanese territory in 1895. Since then, some 40-odd years have passed. Hurriedly, every effort was made at construction, so that now the whole island's face has been made anew, in terms of education, transportation, industry, and sanitation. The savages, who clung to strange and unbelievable customs in the old days, have been reformed and pacified; they have in every way left savagery behind. In addition, the scourge of malaria has been defeated; one can say it is a remnant of the past. In addition, Taiwan boasts an abundance of double-cropped rice, mountains of sugar-producing cane, camphor, and [the island] is rich in timber, etc. Such rare fruits as pineapple and bananas grow naturally and plentifully.  The beauty of water carved cliffs gladdens the eyes of all who seem them; the highest mountain peaks under heaven are on Mt. Niitaka; the hard-to-describe inspirational qualities of Sun Moon Lake; not to mention the castles built by the Dutch, Spanish and Chinese. A tropical country of eternal summer, the island of Hourai, a South Seas paradise, where visitors are welcomed with open arms. Oh you people, come on! Won't you all come and take in such pleasures? Fortunately, for the sake of all, this album appears in miniature, perhaps as a companion. Though we claim a small measure of achievement, we regret that many shortcomings remain and we beg the reader's indulgence.`,
			],
			'description.text.japanese': [
				`台湾の歴史は極めて新しい。西暦千六百二十四年和蘭が領有するまで、殆ど南海の一孤島として、蕃人の割拠に委し或る所は海賊の根拠地となり、難波船の漂着地となってゐたその台湾の名も千六百年頃土人語の轉訛より生まれたものとされ、何等意味なきものである。 　然し我国としては秀吉が入貢を勧めるあり、御朱印船の渡航あり、又濱田彌兵衛の武勇談あり、日本人を母とする鄭成功の領台等あ��、可なり古くから相関連したものがあった。而も明治四年偶々琉球人の漂着して惨殺された事件により、征討の論起り、出師の議熟して西郷都督の台湾征伐となった。其後幾多の曲折を経て明治二十八年遂にわが領土となり爾来四十有余年、鋭意その建設を急ぎ、今や教育に、交通に、産業に、衛生に、あらゆる施設を全うして、全島の風物は劃然としてその面目を一新した。 　その昔、あらぬ習慣や奇習に狂喜した蕃人は、悉く帰順してその風を矯め、事毎に野蛮の域を脱しつつある。又台湾に行くものは必ず罹厄の難に遭うものとされたマラリア病は、既にその矛をおさめて久しく、昔語りとさえなりつつある。又年二期に亙って収穫される豊穣な米、砂糖をはじめ山なす甘蔗、樟脳、木材等盛んにして、パインアップル、バナナ等の珍果、天恵潤して��りある。殊に人々の眼を喜ばす水成岩の美、天下一の高峰新高や、情趣そぞろの日月潭、或は西班牙、和蘭、支那の相倶に築いた城もあって、熱帯の気濃やかな常夏の国、蓬莱の島、而して南海の楽土は、旅する者を双手を挙げて歓迎してゐる。おお、人々よ行け！人々よ行ってその楽しさを享けんか。 　幸いにもこの小さきアルバムが皆様の為にその一片の資となり、或は伴侶となり、僅かながらでも齎らすところあれば.......と思いつつも尚足らざること多き憾みに、只管皆様の御寛恕を乞う。`,
			],
			'description.inscription.english': [],
			'description.inscription.japanese': [],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': [],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': [],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
	{
		id: 'nf0005',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0005-300.jpg',
		title: '[nf0005] [Table of Contents]',
		metadata: {
			'title.english': ['[nf0005] [Table of Contents]'],
			'title.chinese': [],
			'title.japanese': ['目次'],
			'title.korean': [],
			'subject.ocm': [
				'214 PUBLISHING',
			],
			'description.critical': [],
			'description.text.english': [],
			'description.text.japanese': [],
			'description.inscription.english': [],
			'description.inscription.japanese': [],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': [],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': [],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
	{
		id: 'nf0006',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0006-300.jpg',
		title: '[nf0006] The Pier of Kiirun [Jilong] Harbour',
		metadata: {
			'title.english': ['[nf0006] The Pier of Kiirun [Jilong] Harbour'],
			'title.chinese': [],
			'title.japanese': ['基隆新岸壁'],
			'title.korean': [],
			'subject.ocm': [
				'500 WATER AND AIR TRANSPORT',
				'504 PORT FACILITIES',
			],
			'description.critical': [],
			'description.text.english': [
				`A brisk large-ship traffic docks and departs Jilong, the entrance to Taiwan. Jilong is the first step and passageway for Japanese coming ashore on Taiwan. Initially, one is struck by the powerful aroma of banana crates, making for an unforgettable first impression.`,
			],
			'description.text.japanese': [
				`台湾の咽喉として開けている基隆の港巨船の往来繁く、内地より台湾への上陸第一歩の玄関である。初めてそこに立って驚くことは、夥しいバナナの積荷と、その激しい香である。そしてそれは台湾の第一印象として忘れられないものである。`,
			],
			'description.inscription.english': [
				`Permit #181 granted by the Jilong Port Authority Censor, May, 1933`
			],
			'description.inscription.japanese': [
				`撮第一八一号昭和八年五月基隆要基司令許可済`
			],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': ['Jilong'],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': [],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
	{
		id: 'nf0007',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0007-300.jpg',
		title: '[nf0007] The Kiirun [Jilong] Station',
		metadata: {
			'title.english': ['[nf0007] The Kiirun [Jilong] Station'],
			'title.chinese': [],
			'title.japanese': ['基隆停車場'],
			'title.korean': [],
			'subject.ocm': [
				'340 STRUCTURES',
				'341 ARCHITECTURE',
				'344 PUBLIC STRUCTURES',
				'490 LAND TRANSPORT',
				'498 TERMINAL FACILITIES'
			],
			'description.critical': [],
			'description.text.english': [
				`Right next to the wharf, a high tower arises to decorate Jilong's entrance. [Jilong Station] is Taiwan's majestic front gate. With a population of about 90,000 (21,000 Japanese), Jilong City's splendor reveals itself at this very spot. The area near the station is teeming with large structures, such as the official's dorms, docked mail-ships, the Osaka merchant marine, the tax office, city hall, the postal bureau, etc.`,
			],
			'description.text.japanese': [
				`岸壁の直ぐ近くに巍然と聳えているその高棲は、基隆の玄関を飾り、台湾の表門として堂々たるものである。人口約九万人（内地人二万一千）の基隆市の賑栄は此處ぞとばかり開けて居って、驛付近には合同庁舎、近海郵船、大阪商船、税関、市役所、郵便局等の大建築物が櫛比している。`
			],
			'description.inscription.english': [
				`Permit #181 granted by the Jilong Port Authority Censor, May, 1933`
			],
			'description.inscription.japanese': [
				`撮第一八一号昭和八年五月基隆要基司令許可済`
			],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': ['Jilong'],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': [],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
	{
		id: 'nf0008',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0008-300.jpg',
		title: '[nf0008] The Monument at Courbet-Seashore',
		metadata: {
			'title.english': ['[nf0008] The Monument at Courbet-Seashore'],
			'title.chinese': [],
			'title.japanese': ['基隆市街 (基隆市役所前通)'],
			'title.korean': [],
			'subject.ocm': [
				'210 RECORDS',
				'211 MNEMONIC DEVICES',
				'340 STRUCTURES',
				'341 ARCHITECTURE',
				'344 PUBLIC STRUCTURES',
				'360 SETTLEMENTS',
				'363 STREETS AND TRAFFIC',
				'630 TERRITORIAL ORGANIZATION',
				'633 CITIES',
				'640 STATE',
				'647 ADMINISTRATIVE AGENCIES',
			],
			'description.critical': [],
			'description.text.english': [
				`[Title:] Jilong City Street (passing in front of the Jilong Municipal Office). Jilong Municipality encompasses the harbor at Taiwan's northernmost extremity. Only 28 kilometers by rail from the capital, Taipei, it is actually the padlock safeguarding the island's northern gate, where ships small and large from Japan, China and the South Seas pass through. Internally, as the main-trunk line's and Yilan line's terminus, it connects the major cities of Taipei, Taizhong, Tainan, Gaoxiong, and Yilan. We can say it is, along with Gaoxiong, one of the island's two major harbors. Being orderly and neat, the urban districts are beautiful.`,
			],
			'description.text.japanese': [
				`基隆市は基隆港を抱擁する本島北端の市街である。首都台北へ鉄路僅かに二十八粁で、実に本島北門の鑞鑰を成し外は内地支那南洋への要港として大小の船舶常に輻輳し、内は縦貫線及び宣蘭線の起点として、台北台中台南高雄宣蘭等の主要都市へ連り、南の高雄と相竝んで本島の二大港都と称せらる。街區亦整然として美しい。`
			],
			'description.inscription.english': [
				`Permit #181 granted by the Jilong Port Authority Censor, May, 1933`
			],
			'description.inscription.japanese': [
				`撮第一八一号昭和八年五月基隆要基司令許可済`
			],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': ['Jilong'],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': [],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
	{
		id: 'nf0009',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0009-300.jpg',
		title: '[nf0009] The Government Formosa',
		metadata: {
			'title.english': ['[nf0009] The Government Formosa'],
			'title.chinese': [],
			'title.japanese': ['台湾総督府'],
			'title.korean': [],
			'subject.ocm': [
				'340 STRUCTURES',
				'341 ARCHITECTURE',
				'344 PUBLIC STRUCTURES',
				'630 TERRITORIAL ORGANIZATION',
				'631 TERRITORIAL HIERARCHY',
				'640 STATE',
				'647 ADMINISTRATIVE AGENCIES',
			],
			'description.critical': [],
			'description.text.english': [
				`As one approaches Taipei from Jilong, one can glimpse a rising tower in the distance from the passenger-car window. It is the Government-General. It is Taiwan's capitol, occupying the center of the city. It majesty overwhelms the surrounding area. The completion of this large building project consumed six years, starting in 1912. The cost was 2,800,000 yen. The building's total area is 2,800 tsubo [1 tsubo=3.31 sq. meters].`,
			],
			'description.text.japanese': [
				`基隆から台北に近づく時、車窓遥かに聳立する一つの塔を望むことが出来る。それは総督府である。台湾のキャピタル、台北市の中央に占座して、その威風は四隣を壓している。明��四十五年から六ヶ年を要して完成した大建築物で、その工費二百八十万円、総建坪二千百坪である。`
			],
			'description.inscription.english': [],
			'description.inscription.japanese': [],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': ['Taipei'],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': ['[wa0298]'],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
	{
		id: 'nf0010',
		thumbnailUrl: '/assets/lc-spcol-cpw-nofuko-0010-300.jpg',
		title: '[nf0010] The Taiwan Shrine',
		metadata: {
			'title.english': ['[nf0010] The Taiwan Shrine'],
			'title.chinese': [],
			'title.japanese': ['台湾神社'],
			'title.korean': [],
			'subject.ocm': [
				'210 RECORDS',
				'211 MNEMONIC DEVICES',
				'340 STRUCTURES',
				'346 RELIGIOUS AND EDUCATIONAL STRUCTURES'
			],
			'description.critical': [],
			'description.text.english': [
				`Taiwan's only first-rank national shrine. It is the ""Ise Shrine"" of Taiwan. Less that four kilometers north of Taipei, a lush stand of sacred trees (shinboku) houses an abode of spirits among the greenery of Mount Dazhi in the  background, looking down into a glen where flowing springs of the Jilong can be seen. The Shrine's four principle deities are Oukuni tama no mikoto, Ounamuchi no mikoto, Sukunahikona no mikoto, and the one which cannot be forgotten in regards to Taiwan, Prince Shirakawa no Miya Yoshihisa.`,
			],
			'description.text.japanese': [
				`台湾唯一の官幣大社。台湾のお伊勢様だ。台北市から北四粁足らず、後には大直山の緑を負い、谷には基隆皮の清流を眺めて、神木鬱蒼たる霊域に���る。御祭神は大国魂命、大已貴命 [おおなむちのみこと]、少彦名命[すくなひこなのみこと]、それから台湾にとって忘れることの出来ない北白川宮能久親王[きたしらかわのみや よしひさしんのう]の四柱。`
			],
			'description.inscription.english': [],
			'description.inscription.japanese': [],
			'description.ethnicity': [],
			'coverage.location.country': ['Taiwan'],
			'coverage.location': ['Taipei'],
			'format.medium': ['Printed page'],
			'description.indicia': [],
			'creator.maker': ['Yamazaki Kaneichirō'],
			'creator.company': [],
			'description.citation': [],
			'relation.seeAlso': [],
			'contributor': ['Ikegami Naoko'],
			'date.original': [],
			'date.artifact.upper': ['1939'],
			'date.artifact.lower': ['1933'],
			'date.image.upper': [],
			'date.image.lower': [],
			'date.search': [],
			'format.extant': ['59 leaves ; 14 x 20 cm'],
			'relation.isPartOf': [
				'East Asia Image Collection',
				'Colonial Pictorial Works',
				'Scenic Taiwan',
			],
			'format.digital': ['Master TIF image captured at 4000 pixels across the long edge using SilverFast AI 6 software and an Epson 4990 scanner. Online display image was converted to JPG format.'],
			'publisher.digital': ['Special Collections & College Archives, Skillman Library, Lafayette College'],
			'rights.digital': ['This image is posted publicly for non-profit educational use, excluding print publication.  For additional information, please see http://digital.lafayette.edu/copyright for our Reproduction, Use, and Copyright Guidelines.'],
			'creator.digital': [],
		}
	},
]

export const collections = {
	'cpw-nofuko': {
		id: 'cpw-nofuko',
		name: 'cpw-nofuko',
		description: 'Scenic Taiwan printed photograph book',
		works: works,
		schema: schema,
	}
}
