// --------------------
// state
// --------------------
const state = {
    page: "cover",
    menuOpen: false,
    input: {
        who: "",
        when: "",
        where: "",
        what: "",
        particle: "で",
        level: 1
    },
    diary: JSON.parse(localStorage.getItem("diary") || "[]"),
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
    batch: []
};

// --------------------
// vocabulary (The Infinite Shift Edition)
// --------------------
const WHEN_LIST = {
    // 【L3選択時に使用：極めてシンプル・事実強調】
    // 行動（WHAT）が強烈なので、導入は短く「気づいたらこうなっていた」感を出す
    level1: [
        "案の定", "よく見ると", "ふと気がつくと", "というか、むしろ", "あろうことか",
        "あきらめた瞬間に", "案外すんなりと", "今さらながら", "念のため確認すると", "何を思ったか",
        "どういうわけか", "なぜか知らないけれど", "自分でも驚くことに", "もはや説明不要なレベルで", "一分一秒を惜しんで",
        "そういえば", "一か八か", "どさくさに紛れて", "コンビニの袋をガサつかせながら", "スマホを置いた瞬間に"
    ],
    // 【L2選択時に使用：中庸・状況補足】
    // 日常の延長線上にありつつ、少しだけ物語性を添える
    level2: [
        "運命のいたずらか", "あいにくのタイミングで", "まるで映画のように", "ここだけの話", "まさかの展開で",
        "お昼休みのチャイムと共に", "帰り道の夕暮れの中で", "コーヒーを淹れた瞬間", "靴紐を結び直した時に", "あくびが止まらない時に",
        "誰かの視線を感じた瞬間に", "不思議なことに", "まるで他人事のように", "無重力になったような気分で", "地球の裏側を思い浮かべながら",
        "窓を全開にした時に", "お湯が沸騰した瞬間に", "カレンダーをめくった瞬間に", "パンが焼けたとき", "深夜の静まり返った部屋で",
        "深い溜息をついたあとに", "背伸びをして空を見た時に", "鍵を閉めて歩き出した時に", "ページをめくる指が止まった時に", "夕刊がポストに落ちた音で"
    ],
    // 【L1選択時に使用：癖強・過剰演出】
    // 行動（WHAT）が地味なため、導入を大げさにして「そんな大事（おおごと）か？」というギャップを作る
    level3: [
        "全米が泣いたその瞬間に", "神様がくしゃみをした拍子に", "一世一代の覚悟で", "ひっそりと、かつ大胆に", "歴史が動く予感がして",
        "何をトチ狂ったか", "満を持して", "テストの静寂を切り裂いて", "シャワーの湯気の中で", "掃除機をかけている最中に",
        "信号が赤に変わった瞬間に", "世界が止まったような気がして", "あわよくばで", "懐かしい曲が流れてきた時に", "前ぶれもなく唐突に",
        "テレビを消した静寂の中で", "雨がポツポツ降り出した頃", "目覚ましが鳴る1分前に", "爪を切った直後に", "お辞儀をした拍子に",
        "ポケットの小銭を数えた時に", "階段を一段飛ばした時に", "鏡の自分と目が合った時に", "あたたかいココアを飲んだあとに", "誰かの話し声が遠くで聞こえる中",
        "ふと名前を忘れかけた瞬間に", "水滴がコップを伝う間に", "くしゃみを我慢した瞬間に", "時計の針が重なった時に", "新しい靴を下ろした朝に"
    ]
};

const WHO_LIST = {
    level1: [
        "柴犬", "工事のおじさん", "店員さん", "小学生", "運転手さん", "お母さん", "お兄さん", "本を読む人", "野良猫", "郵便屋さん",
        "高校生", "おばさん", "配達員", "ジョギングの人", "おじいさん", "先生", "ハト", "赤ちゃん", "サラリーマン", "お姉さん",
        "カラス", "警備員さん", "スズメ", "看板娘", "掃除のおばさん", "散歩中の人", "大学生", "八百屋さん", "警察官", "コックさん",
        "お医者さん", "看護師さん", "美容師さん", "カメラマン", "釣り人", "農家の人", "駅員さん", "車掌さん", "チアリーダー", "力士",
        "飼い猫", "カメ", "金魚", "ハムスター", "カルガモ", "散歩中の犬", "道を聞く人", "買い物中の人", "ランナー", "ガードマン",
        "ペンキ屋さん", "花屋さん", "魚屋さん", "クリーニング屋さん", "図書館員", "飼育員さん", "ギタリスト", "ピアニスト", "ダンサー", "マジシャン",
        "住職さん", "巫女さん", "大工さん", "ボクサー", "水泳選手", "サッカー選手", "野球選手", "テニスプレイヤー", "バレリーナ", "サーファー",
        "観光客", "ガイドさん", "通訳さん", "記者さん", "アナウンサー", "気象予報士", "消防士", "救急隊員", "漫画家", "指揮者",
        "犬を連れた人", "スマホを見る人", "お弁当を食べる人", "バスを待つ人", "笑っている子供", "眠そうな会社員", "早歩きの人", "仲良しの親子", "作業服の人", "スーツの女性",
        "自転車の学生", "三輪車の子供", "ベビーカーを押す人", "買い物袋を持つ人", "傘をさした人", "帽子をかぶった人", "眼鏡をかけた人", "リュックの若者", "エプロンの主婦", "ベンチの老人"
    ],
    level2: [
        "オーケストラの指揮者", "プロレスラー", "宇宙飛行士", "パティシエ", "考古学者", "探偵", "フラメンコダンサー", "歌舞伎役者", "砂漠のラクダ", "アフリカの象",
        "南極のペンギン", "オーストラリアのカンガルー", "百獣の王ライオン", "竹藪のパンダ", "森のフクロウ", "池のカメ", "水族館のイルカ", "牧場の羊", "北極のシロクマ", "密林のトラ",
        "ピエロ", "騎士（ナイト）", "海賊", "カウボーイ", "忍者", "侍", "貴族", "王様", "お姫様", "探検家",
        "潜水士", "スタントマン", "レーサー", "ボディビルダー", "彫刻家", "オペラ歌手", "落語家", "歌姫", "モデル", "マジシャン",
        "闘牛士", "フラダンス講師", "サンバダンサー", "ヨガの先生", "空手の達人", "柔道家", "フェンシング選手", "体操選手", "スケート選手", "スノーボーダー",
        "キリン", "シマウマ", "カバ", "サイ", "チーター", "ゴリラ", "チンパンジー", "フラミンゴ", "クジャク", "ワシ",
        "ワニ", "ヘビ", "イグアナ", "カンガルー", "コアラ", "ウォンバット", "アルパカ", "ラッコ", "アザラシ", "セイウチ",
        "トナカイ", "リス", "キツネ", "タヌキ", "イノシシ", "シカ", "クマ", "サル", "ツル", "白鳥",
        "バイオリニスト", "サックス奏者", "ドラマー", "DJ", "映画監督", "ミステリー作家", "プロ棋士", "囲碁の先生", "書道家", "茶道の家元",
        "SP", "特殊部隊", "パイロット", "CA", "航海士", "潜水艦の船長", "外交官", "占い師", "冒険家", "大富豪"
    ],
    // 【修正版 Level 3】手足がある・擬人化しやすい・着ぐるみ等に限定
    level3: [
        "お殿様", "サンタクロース", "唐草模様の泥棒", "原始人", "魔法使い",
        "ミイラ男", "宇宙人", "忍者の親分", "執事", "メイドさん",
        "全身金ピカの人", "伝説の勇者", "悪の組織の戦闘員", "マッドサイエンティスト", "未来人",
        "半魚人", "透明人間", "動く銅像", "狼男", "吸血鬼",
        "着ぐるみのクマ", "着ぐるみのウサギ", "ゆるキャラ", "全身タイツの人", "覆面レスラー",
        "カッパ", "天狗", "鬼", "座敷わらし", "雷様",
        "大根の被り物をした人", "食パンのコスプレをした人", "段ボールロボット", "ケンタウロス", "二足歩行の猫",
        "白塗りのパントマイマー", "仮面舞踏会の人", "落ち武者", "陰陽師", "仏像（動くタイプ）",
        "妖精さん", "小人s", "巨人", "サイボーグ", "アンドロイド",
        "魔王", "勇者", "村人A", "王宮の兵士", "森の賢者",
        "サメの着ぐるみ", "タコの着ぐるみ", "恐竜のパジャマの人", "ガイコツ剣士", "死神"
    ]
};

const WHERE_LIST = {
    // 【レベル1：日常・あるある】現実味があり、情景が浮かびやすい場所
    level1: [
        "砂場で", "レジ前で", "道端で", "階段で", "空き地で",
        "屋上で", "改札に", "路地裏で", "芝生で", "玄関で",
        "廊下で", "窓際で", "布団で", "ベンチに", "車内で",
        "店先で", "物陰で", "坂道で", "角っこに", "バス停で",
        "駐輪場で", "掲示板前で", "踏切前で", "歩道橋で", "ポスト前に",
        "靴箱の前で", "ソファーの隅に", "門の前で", "人混みで", "鏡の前で",
        "隅っこに", "真ん中で", "目の前に", "隙間で"
    ],
    // 【レベル2：ドラマチック・特殊】少し特別な状況や、動きのある場所
    level2: [
        "お子様ランチを前に", "試食コーナー付近で", "ガチャガチャの前で", "ソフトクリーム横に", "パン屋の隣で",
        "100円ショップに", "コインランドリーで", "クレーンゲーム前で", "着ぐるみの隣に", "回転寿司で",
        "土俵の真ん中で", "表彰台に", "マウンドで", "舞台袖で", "朝礼台で",
        "保健室で", "給食中に", "跳び箱の上に", "非常階段で", "ホワイトボード前で",
        "真っ暗な中で", "行列の中で", "霧の中で", "夕焼けの下で", "ひまわり畑で",
        "水たまりで", "映画館で", "サウナの中で", "焚き火の前で", "宝石店で",
        "工事現場で", "電話ボックスに", "鳥居の下で", "最前列で", "境界線上に"
    ],
    // 【レベル3：シュール・極限】ありえない場所や、次元が歪んでいる場所
    level3: [
        "お風呂で", "ヘリポートに", "密室で", "洗濯物横に", "押入れで",
        "隠れ家に", "玉座に", "スポットライト下に", "秘密基地で", "露天風呂で",
        "滝の下で", "絶叫マシンで", "花火の下で", "裏側で",
        "ど真ん中で", "どん詰まりに", "すぐそこに", "あっち側で", "テッペンで",
        "一番後ろで", "箱の中に", "ポッケの中に", "ページの間で", "フチの上に",
        "真っ白な部屋に", "無重力空間に", "夢の中で", "異次元の入り口で", "巨大な掌の上に"
    ]
};

const WHAT_LIST = {
    // 【修正版 Level 1】道具依存（スマホ・眼鏡・靴紐など）を排除し、身体的ミス・感情に統一
    level1: [
        "足音にビクッとした", "何もない場所でつまずいた", "方向音痴を発揮した", "あくびが止まらなくなった", "自分の影に驚いた",
        "寝言ではっきり返事した", "盛大に噛んだ", "左右の足がもつれた", "変な声が出た", "くしゃみが止まらなくなった",
        "蚊を叩こうとして自分を叩いた", "お辞儀の勢いで頭をぶつけた", "階段を一段踏み外した", "空耳で返事をした", "迷子になった",
        "「おやすみ」と言い間違えた", "ボーッとして壁にぶつかった", "笑い声でむせた", "影を敵だと思った", "急に姿勢を正した",
        "ボタンを押し間違えた", "スリッパを飛ばした", "鳥のフンが近くに落ちた", "顎がカクッと鳴った", "目的を忘れて立ち尽くした",
        "空腹でお腹が鳴り響いた", "息を吸うタイミングを間違えた", "手と足が一緒に出た", "鏡の自分に驚いた", "一歩目でバランスを崩した",
        "突然のしゃっくりが出た", "空のお皿をフォークで刺した", "椅子からずり落ちた", "思ったより段差が低かった", "返事をしてすぐ忘れた",
        "洗顔料と歯磨き粉を間違えた", "誰もいないのに会釈した", "寝癖が芸術的だった", "全力で空振りした", "熱いものを食べて踊った",
        "お辞儀でバランスを崩した", "くしゃみで腰を痛めた", "ゴミ箱にぶつかった", "シャッターチャンスを逃した", "隣の人と同じ動きをした",
        "看板に挨拶した", "自分の足に躓いた", "逆さまに地図を見ていた", "何しに来たか忘れた", "飛ぼうとして少し跳ねた",
        "風当りの強さに負けた", "こぼしてドヤ顔をした", "ガムを飲み込んだ", "全力で二度寝した", "自分を抱きしめてみた",
        "裏返った声が出た", "知らない人に手を振った", "急に真顔になった", "二の腕を揉んでみた", "睡魔に負けた",
        "蚊を逃して拍手した", "鏡の前でキメ顔をした", "昨日の予定を思い出した", "炭酸で鼻がツーンとした", "忘れ物を思い出して叫んだ",
        "一粒の納豆と格闘した", "自分の体温に驚いた", "パンを焦がして眺めた", "靴下が脱げかけた", "鼓動でリズムを取った",
        "エスカレーターに乗るタイミングを逃した", "看板を二度見して転んだ", "自分の匂いを嗅いだ", "全力で空気椅子をした", "意味もなく拳を握った"
    ],

    // 【修正版 Level 2】派手なアクション中心に変更（道具系を削除）
    level2: [
        "盛大にずっこけた", "突然ドヤ顔を決めた", "垂直に跳び上がった", "空振りで三回転した", "ズッコケて前転した",
        "猛烈に照れ始めた", "千鳥足で激走した", "膝から崩れ落ちた", "地団駄を踏みまくった", "裏返った声で叫んだ",
        "変なポーズで固まった", "一回転半ひねりで転んだ", "謎のステップを踏んだ", "クシャミで後ろに飛んだ",
        "地響きを立てて転んだ", "変顔で顎が外れた", "腰を抜かして座り込んだ", "着地で股割りになった", "ガッツポーズで首を痛めた",
        "豪快にむせ返った", "サンバを踊り狂った", "足がもつれて回転した", "驚いて荷物を投げた", "ひっくり返ってジタバタした",
        "驚きすぎて硬直した", "転んで「想定内」と呟いた", "笑いすぎて椅子から落ちた", "四股を力強く踏んだ", "変なダンスで力尽きた",
        "ペンギン歩きになった", "猛烈に拍手し始めた", "目を見開いて震えた", "急に逆立ちを始めた", "全力で頬を膨らませた",
        "スキップが止まらない", "鳩の動きで歩いた", "猛スピードで後ずさりした", "お腹を抱えて笑い転げた", "必死に指折り数えた",
        "キメ顔で静止した", "生まれたての小鹿になった", "急に高音で歌い出した", "謎の動きで迫り寄った", "空中で足をバタつかせた",
        "宇宙の真理を見た顔をした", "猛烈な勢いで謝った", "喜びを爆発させて転んだ", "一歩ごとにポーズを決めた", "壁にぶつかったのをごまかした",
        "その場で高速スピンした", "ガッツポーズが止まらない", "全力でぶりっ子をした", "急に悟りを開いて浮かれた", "意味不明なジェスチャーをした",
        "盛大に拍手喝采した", "一瞬で寝たふりをした", "急に丁寧な敬語になった", "派手にずっこけて泳いだ", "急に太陽を拝み始めた",
        "全力で自分を応援した", "急に指揮者の真似をした", "リズムに乗って刻み始めた", "全力で目を泳がせた", "一瞬で無表情に戻った",
        "変な呼吸法を始めた", "急に土下座した", "全力で空気を食べた", "急に先祖を思い出した", "自信満々に間違えた",
        "指をパチンと鳴らした", "急に機械的な動きになった", "膝を激しく叩いた", "何かに取り憑かれた動き", "全力で空気椅子をした",
        "モデル歩きを披露した", "額に手を当ててよろけた", "足踏みし続けた", "急に走り出して戻ってきた", "肩を抱いて震えた",
        "「はっ！」と閃いた顔をした", "全力で虚空を見つめた", "小刻みに震え出した", "勝利を確信して踊った", "急に内緒話をしてきた",
        "全力で変な顔をした", "一点を見つめて固まった", "スキップしてどこかへ行った", "急に優雅な会釈をした", "無駄にキレのある動きをした",
        "両手を広げて風を感じた", "一点倒立を試みた", "全力の猫だましをした", "急に反省し始めた", "鳩を真似て首を振った",
        "忍び足で近づいてきた", "全身全霊で「無」になった", "派手にコケて寝たふりをした", "意味もなく拳を突き上げた", "幸せを噛み締めて目を閉じた"
    ],
    // 【Level 3】は元々ファンタジーな動作なので、WHOの修正により「人型」になれば全て成立します。変更なしでOK。
    level3: [
        "1ミリだけ浮いた", "虹色に発光した", "語尾がすべて「ピヨ」になった", "3人に分裂した", "内ポケからハトを出した",
        "100羽の鳩に囲まれた", "一歩ごとにバラが咲いた", "喋るたびにシャボン玉が出た", "全身金ピカになった", "小さな羽が生えた",
        "10センチだけ巨大化した", "スローモーションになった", "鼻提灯を膨らませた", "うなずくたびにポヨポヨ鳴った", "涙で虹を架けた",
        "常に雨雲を連れ歩いた", "全身マシュマロになった", "足元をレッドカーペットにした", "ゴムのように伸びた", "王冠を授かった",
        "カチコチの石になった", "足跡から草が生えた", "天使を舞い降ろした", "スズランの音を響かせた", "ひとりだけスポットライトを浴びた",
        "自分の影に座り込まれた", "頭をお花畑にした", "触れたものをすべて浮かせた", "ポップコーンを噴き出した", "額に「合格」と出た",
        "瞬きするたびにキラキラした", "ヒヨコに埋もれた", "全身ツヤツヤになった", "笑うたびにベルが鳴った", "頭をシャンデリアにした",
        "急にセピア色になった", "周囲に羽を飛ばした", "靴の裏から虹を伸ばした", "空からスポンジが落ちてきた", "パンの焼ける匂いを放った",
        "歩くたびにコインの音がした", "頭に花が咲いた", "白い羽を撒き散らした", "拍手喝采を浴びた", "耳がウサギになった",
        "叫ぶたびに花火の音がした", "頭上に虹をかけた", "自分の影に追い越された", "黄色い風船に包まれた", "眉毛を光らせた",
        "足元からお菓子が湧いた", "喋るたびに笛を鳴らした", "頭にソフトクリームを乗せた", "シャボン玉を溢れさせた", "床を水たまりにした",
        "急に背がグンと伸びた", "頭に小鳥を乗せた", "鈴の音を鳴らし続けた", "風船で浮き上がった", "頭に大きなリボンをつけた",
        "甘い香りを漂わせた", "どこからか星を降らせた", "全身透明になった", "周囲を芝生に変えた", "頭をひまわりにした",
        "神々しい後光を放った", "瞬時に「ピンポン」と鳴った", "頭にリンゴを乗せた", "強制帰宅させられた", "紙吹雪を舞わせた",
        "赤ちゃんに戻った", "うっすらピンクになった", "床から噴水を上げた", "一言ごとに驚かれた", "頭をミラーボールにした",
        "自分の影に手を振られた", "金色の蝶を呼び寄せた", "喋るたびに小鳥をさえずらせた", "テカテカの銅像になった", "頭にパトランプを乗せた",
        "空中から「天才」と表示された", "マイナスイオンを放出した", "太鼓の音を鳴り響かせた", "自分の影と喧嘩した", "ハートを飛び交わせた",
        "巨大なテディベアになった", "地面から花火を打ち上げた", "頭にひよこを乗せた", "石鹸の泡に包まれた", "「ジャジャーン」と鳴り響いた",
        "自分の影に会釈された", "子犬に懐かれまくった", "全身銀色になった", "無重力でダンスした", "自分を書き足した",
        "急に二次元になった", "体からアロマが香った", "急に歴史上の人物になった", "ハープの音を奏でた", "一瞬で大仏になった"
    ]
};

const WORD_MASTER = {
    who: WHO_LIST,
    where: WHERE_LIST,
    what: WHAT_LIST
};

// --------------------
// helpers
// --------------------
const rand = arr => arr[Math.floor(Math.random() * arr.length)];

function getRandElement(array) {
    if (!array || array.length === 0) return "";
    return array[Math.floor(Math.random() * array.length)];
}

function getLevelAppropriateWord(type, level) {
    const list = WORD_MASTER[type];
    let pool = [];
    if (level >= 1) pool = [...list.level1];
    if (level >= 2) pool = [...pool, ...list.level2, ...list.level2];
    if (level >= 3) pool = [...pool, ...list.level3, ...list.level3, ...list.level3];
    return getRandElement(pool);
}

function saveDiary(text, levelClass) {
    if (!state.diary) state.diary = [];
    
    let parts = [];
    // trim()で空白を除去し、文字数が1文字以上ある時だけ助詞を足す
    if (state.input.who && state.input.who.trim().length > 0) {
        parts.push(state.input.who.trim() + "が");
    }
    if (state.input.where && state.input.where.trim().length > 0) {
        parts.push(state.input.where.trim() + (state.input.particle || "で"));
    }
    if (state.input.what && state.input.what.trim().length > 0) {
        parts.push(state.input.what.trim());
    }
    
    if (parts.length === 0) return;
    const originalFull = parts.join("");

    state.diary.unshift({ 
        text: text, 
        original: originalFull,
        levelClass: levelClass,
        time: new Date().toLocaleDateString() 
    });
    localStorage.setItem("diary", JSON.stringify(state.diary));
}
// 日記の削除用
function deleteDiaryItem(index) {
    state.diary.splice(index, 1);
    localStorage.setItem("diary", JSON.stringify(state.diary));
    render();
}

// --------------------
// Core Logic: The Matrix Switcher
// --------------------

function generateSentence() {
    const input = state.input;
    const level = parseInt(input.level) || 1;

    let filledKeys = [];
    if (input.who) filledKeys.push('who');
    if (input.where) filledKeys.push('where');
    if (input.what) filledKeys.push('what');

    const inputCount = filledKeys.length;

    let replaceCount = 0;
    if (inputCount === 2) {
        replaceCount = (level === 1) ? 0 : 1;
    } else if (inputCount === 3) {
        if (level === 1) replaceCount = 1;
        else if (level === 2) replaceCount = 2;
        else if (level === 3) replaceCount = 2; 
    }

    const priorityOrder = ['what', 'who', 'where'];
    const targetsToReplace = priorityOrder
        .filter(key => filledKeys.includes(key))
        .slice(0, replaceCount);

    const whenLevel = 4 - level; 
    const finalWhen = getRandElement(WHEN_LIST[`level${whenLevel}`]);

    const parts = {
        who: { val: input.who, isReplaced: false },
        where: { val: input.where, isReplaced: false, particle: input.particle || "で" },
        what: { val: input.what, isReplaced: false }
    };

    ['who', 'where', 'what'].forEach(key => {
        const isInput = filledKeys.includes(key);
        const isTarget = targetsToReplace.includes(key);

        if (isTarget || !isInput) {
            const word = getLevelAppropriateWord(key, level);
            if (key === 'where') {
                // 最後の1文字を取得
                const lastChar = word.slice(-1);
                // 助詞として認める文字のリスト
                const validParticles = ['で', 'に', 'を', 'へ'];
                if (validParticles.includes(lastChar)) {
                    parts[key].val = word.slice(0, -1);
                    parts[key].particle = lastChar;
                } else {
                    parts[key].val = word;
                    parts[key].particle = "で"; 
                }
            } else {
                parts[key].val = word;
            }
            parts[key].isReplaced = true;
        }
    });

    const fusenData = {
        1: { color: "#FFF9C4", class: "lv1" },
        2: { color: "#E1F5FE", class: "lv2" },
        3: { color: "#FCE4EC", class: "lv3" }
    };
    const currentFusen = fusenData[level];
    // 共通のマーカー関数（黄色いラインを引くHTMLを作る）
    const addMarker = (text) => `<span class="marker">${text}</span>`;
    // 1. 冒頭の「いつ（When）」は必ずAIが足すものなので、常にマーカーを引く
    const whenPart = addMarker(finalWhen);
    // 2. 単語ごとのマーカー処理（置換されたものだけラインを引く）
    const processPart = (p) => p.isReplaced ? addMarker(p.val) : p.val;
    // 3. 場所（Where）の処理
    const whereFinal = `${processPart({val: parts.where.val, isReplaced: parts.where.isReplaced})}${parts.where.particle}`;
    // 4. 全体を合体
    const finalSentence = `${whenPart}、${processPart(parts.who)}が${whereFinal}${processPart(parts.what)}。`;

    return {
        text: finalSentence,
        color: currentFusen.color,
        levelClass: currentFusen.class
    };
}

// --------------------
// render (アニメーションとラインを復元)
// --------------------
function render() {
    const app = document.getElementById("app");

    if (state.page === "cover") {
    app.innerHTML = `
    <div class="cover">
        <img src="assets/logo.png" alt="モヤほどきロゴ" class="cover-logo">
        
        <button class="clay-btn blue dokudoku" onclick="go('input')">START</button>
        
        <div class="char-container-bottom">
            <div id="coverSpeech" class="speech-bubble-ref"></div>
            <div class="char-visual-large"><img src="assets/moyataro3.svg" class="floating"></div>
        </div>
    </div>
    `;
    setTimeout(() => {
        const cs = document.getElementById("coverSpeech");
        if (cs) {
            const messages = [
                "さっきあったモヤモヤ、<br>ここでばからしくしてこ"
            ];
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            cs.innerHTML = randomMsg;
            cs.classList.add("show");
        }
    }, 500);
    return; 
    }
    app.innerHTML = `
    <header class="folder-header">
        <img src="assets/logo.png" class="mini-logo-top" onclick="resetAndGo('input')">
        <nav class="notebook-nav">
            <div class="stamp-btn ${state.page === 'input' ? 'active' : ''}" onclick="resetAndGo('input')">
                <img src="assets/input_icon.svg" class="input-icon-img"><span class="stamp-label">入力</span>
            </div>
            <div class="stamp-btn ${state.page === 'diary' ? 'active' : ''}" onclick="go('diary')">
                <img src="assets/diary_icon.svg" class="input-icon-img"><span class="stamp-label">日記</span>
            </div>
            <div class="stamp-btn ${state.page === 'about' ? 'active' : ''}" onclick="go('about')">
                <img src="assets/about_icon.svg" class="input-icon-img"><span class="stamp-label">もやたろう</span>
            </div>
        </nav>
    </header>
    <div id="page-container" class="notebook-content"></div>
    `;
    

    const container = document.getElementById("page-container");

    // Input Page
    if (state.page === "input") {
        container.innerHTML = `
        <div class="char-container input-mode">
            <div id="speech" class="speech-bubble"></div>
            <div class="char-visual"><img src="assets/moyataro.svg" class="floating"></div>
        </div>
        
        <div class="thought-bubble-wrapper">
            <img src="assets/fuki_back.svg" class="bubble-bg">
            <div class="form-content">
                <div class="input-row inline-row">
                    <img src="assets/who_icon.svg" class="input-icon-img">
                    <input placeholder="なに？" value="${state.input.who}" oninput="state.input.who=this.value">
                    <span class="moya-particle">が</span>
                </div>
                <div class="input-row inline-row">
                    <img src="assets/where_icon.svg" class="input-icon-img">
                    <input placeholder="どこ？" value="${state.input.where}" oninput="state.input.where=this.value">
                    <select class="particle-select" onchange="state.input.particle=this.value">
                        <option value="で" ${state.input.particle === 'で' ? 'selected' : ''}>で</option>
                        <option value="に" ${state.input.particle === 'に' ? 'selected' : ''}>に</option>
                    </select>
                </div>
                <div class="input-row">
                    <img src="assets/what_icon.svg" class="input-icon-img">
                    <input placeholder="なにがあった？" value="${state.input.what}" oninput="state.input.what=this.value">
                </div>
                <div class="moya-suffix">からモヤっとした！</div>
            </div>
        </div>
        
        <div class="controls-area">
    <div class="small-note">どれぐらいほどく？</div>
    
    <div class="step-slider-container">
        <div class="step-line">
        <div class="step-progress" style="width: ${state.input.level == 1 ? 10 : state.input.level == 2 ? 50 : 90}%"></div>
        </div>
        
        <div class="step-nodes">
            <div class="step-node ${state.input.level >= 1 ? 'active' : ''}" onclick="setLevel(1)">
                <div class="node-circle"></div>
                <span class="step-label">ちょっと</span>
            </div>
            <div class="step-node ${state.input.level >= 2 ? 'active' : ''}" onclick="setLevel(2)">
                <div class="node-circle"></div>
                <span class="step-label">なかなか</span>
            </div>
            <div class="step-node ${state.input.level >= 3 ? 'active' : ''}" onclick="setLevel(3)">
                <div class="node-circle"></div>
                <span class="step-label">めっちゃ</span>
            </div>
        </div>
    </div>

    <button class="clay-btn blue dokudoku" onclick="transform()">ほどく</button>
    </div>
        `;
        
    window.setLevel = function(n) {
    state.input.level = n;

    // nodeのactive切り替え
    const nodes = document.querySelectorAll('.step-node');
    nodes.forEach((node, index) => {
        if (index + 1 <= n) {
            node.classList.add('active');
        } else {
            node.classList.remove('active');
        }
    });

    // ★バーの長さをピタッと合わせる
    const progress = document.querySelector('.step-progress');
    
    // ここの数値を微調整します。
    // コンテナのpaddingや丸のサイズによりますが、以下の数値が目安です。
    // 1番目：5% (丸の左端) / 2番目：50% (真ん中) / 3番目：95% (右端)
    const percents = [10, 50, 90]; 
    
    if (progress) {
        progress.style.width = percents[n - 1] + '%';
    }
    };

        initSpeech();
    }
    // Result Page
    else if (state.page === "result") {
        const resultData = state.batch[0];
        const plainText = resultData.text.replace(/<[^>]*>/g, '');
        const isFav = state.favorites.includes(plainText);

        // ★修正ポイント：loadingの中身を「蒸発アニメーション」に変更
        container.innerHTML = `
        <div id="loading" class="loading-area">
        <div class="moya-evaporation-container">
            <div class="moya-main">
                <img src="assets/moyataro4.svg" alt="もやたろう">
            </div>
            
            <div class="particle p1" style="left: 10%; animation-delay: 0s;"></div>
            <div class="particle p3" style="left: 85%; animation-delay: 0.5s;"></div>
            
            <div class="particle p2" style="left: 30%; animation-delay: 1.2s;"></div>
            <div class="particle p1" style="left: 70%; animation-delay: 1.8s;"></div>
            
            <div class="particle p3" style="left: 20%; animation-delay: 2.2s;"></div>
            <div class="particle p2" style="left: 60%; animation-delay: 0.8s;"></div>
        </div>
        
        <div class="small-note" style="margin-top: 2rem; text-align: center;">モヤをほどいています…</div>
    </div>
    
    
            
            <div id="resultContent" class="result-container" style="display:none;">
                <div class="char-container result-char">
                    <div id="resultSpeech" class="speech-bubble"></div>
                    <div class="char-visual">
                        <img src="assets/moyataro2.svg" alt="character" class="floating">
                    </div>
                </div>

                <div class="thought-bubble-result ${resultData.levelClass} show-trigger" style="position: relative;">
                    <div class="bubble-content-center">${resultData.text}</div>
                </div>

                <div class="result-actions">
                    <div class="button-group">
                        <button class="secondary-btn" onclick="go('input')">まだほどけない</button>
                        <button class="primary-btn" onclick="saveAndGoToDiary()">ほどけた</button>
                    </div>
                </div>
            </div>
        `;

        // 演出の実行
        // ★修正ポイント：時間を 1200 から 3000 (3秒) に変更して、アニメーションを見せる
        setTimeout(() => {
            const loadingElement = document.getElementById("loading");
            const resultContent = document.getElementById("resultContent");
            
            if (loadingElement) loadingElement.style.display = "none";
            if (resultContent) {
                resultContent.style.display = "block";
                
                const rs = document.getElementById("resultSpeech");
                if(rs) {
                    rs.textContent = "モヤモヤをほどいて編み直してみたよ！どう？";
                    setTimeout(() => rs.classList.add("show"), 100);
                }

                const bubble = document.querySelector(".show-trigger");
                if (bubble) {
                    setTimeout(() => {
                        bubble.classList.add("show");
                        bubble.classList.remove("show-trigger");
                    }, 300);
                }
            }
        }, 3000); // ← ここを3秒に変更
        }
    // --------------------------------------------------
    // Diary Page (修正完了版)
    // --------------------------------------------------
    else if (state.page === "diary") {
        container.className = "notebook-content diary-page";
        
        // フィルタ初期化
        if (state.showOnlyFav === undefined) state.showOnlyFav = false;

        // リスト作成（インデックス保持）
        const fullList = state.diary.map((item, index) => ({ ...item, originalIndex: index }));
        const displayList = state.showOnlyFav ? fullList.filter(d => d.isFavorite) : fullList;

        // グループ化
        const groups = [];
        displayList.forEach(item => {
            const lastGroup = groups[groups.length - 1];
            if (lastGroup && lastGroup.time === item.time && lastGroup.original === item.original) {
                lastGroup.items.push(item);
            } else {
                groups.push({
                    time: item.time,
                    original: item.original,
                    items: [item]
                });
            }
        });

        // HTML生成
        container.innerHTML = `
            <div class="diary-header">
                <h2 class="diary-title-text">ほどきログ</h2>
                <div class="filter-toggle ${state.showOnlyFav ? 'active' : ''}" id="favFilterBtn">
                ★のみ
                </div>
            </div>

            <div class="diary-list">
                ${groups.length === 0 ? `
                    <div class="empty-diary">
                        <img src="assets/moyataro.svg" style="width:80px; opacity:0.5; margin-bottom:1rem;">
                        <p>ログがありません</p>
                    </div>` : ''}
                
                ${groups.map(group => `
                    <div class="diary-entry-group">
                        <div class="diary-date-label">${group.time}</div>
                        ${group.original ? `<div class="original-text-strike">${group.original}</div>` : ''}
                        
                        <div class="diary-cards-container">
                            ${group.items.map(d => `
                                <div class="diary-card-wrapper">
                                    <div class="diary-card ${d.levelClass || 'lv1'}">
                                        <div class="diary-text">${d.text}</div>
                                        
                                        <div class="diary-actions-minimal">
                                            <button class="action-icon star ${d.isFavorite ? 'active' : ''}" 
                                                onclick="toggleFavorite(${d.originalIndex})">
                                                ${d.isFavorite ? '★' : '☆'}
                                            </button>
                                            <button class="action-icon delete" 
                                                onclick="deleteDiaryItem(${d.originalIndex})">
                                                ✖
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>
            
            <div style="text-align:center; margin-top:20px;">
                <button class="back-home-btn" onclick="go('input')">戻る</button>
            </div>
        `;

        const filterBtn = document.getElementById("favFilterBtn");
        if(filterBtn) {
            filterBtn.onclick = () => {
                state.showOnlyFav = !state.showOnlyFav;
                render();
            };
        }
    // --------------------------------------------------
    // 2. Aboutページ (About)
    // --------------------------------------------------
    } else if (state.page === "about") {
        container.innerHTML = `
            <img src="assets/about_page.svg" class="about-page-img">
            
            <div class="concept-container">
                <h3 class="concept-title">
                    モヤほどき = <br>モヤモヤした出来事 × ちょっとしたズレ
                </h3>
                <div class="concept-text">
                    <p>モヤモヤを解決する場所ではありません。</p>
                    <p>少しだけ、出来事から距離を取るためのツールです。</p>
                    <p>誰かに話すほどでもない気持ちを、<br>いったん預けられます。</p>
                </div>
            </div>

            <button onclick="go('input')" class="secondary-btn" style="margin-top: 30px;">戻る</button>
        `;
    }
}
window.resetAndGo = function(page) {
    state.input = { who: "", where: "", what: "", level: 1, particle: "で" };
    state.page = page;
    render();
}
// 日記内でのファボ切り替え（再描画を含む）
function toggleFavInDiary(text) {
    toggleFav(text); // 既存のロジック
    render();        // 日記画面を更新
}
// お気に入りを切り替える関数
function toggleFavorite(index) {
    if (state.diary && state.diary[index]) {
        // true/false を反転させる
        state.diary[index].isFavorite = !state.diary[index].isFavorite;
        // 保存して再描画
        localStorage.setItem("diary", JSON.stringify(state.diary));
        render();
    }
}

// 「ほどけた」ボタン用：結果を日記へ保存（★自動お気に入りON）
function saveAndGoToDiary() {
    const currentResult = state.batch[0];
    if (!currentResult) return;

    if (!state.diary) return;

    // ★ 今表示中の文章と一致するものを探す
    const targetIndex = state.diary.findIndex(item =>
        item.text === currentResult.text
    );

    // ★ 見つかったものだけお気に入りにする
    if (targetIndex !== -1) {
        state.diary[targetIndex].isFavorite = true;
    }

    localStorage.setItem("diary", JSON.stringify(state.diary));
    go("diary");
}


// --------------------
// UI Logic (復元・修正版)
// --------------------
function transform() {
    const result = generateSentence();
    state.batch = [result];

    if (!state.diary) state.diary = [];
    
    // --- 原文の組み立て ---
    let parts = [];
    if (state.input.who && state.input.who.trim()) {
        parts.push(state.input.who.trim() + "が");
    }
    if (state.input.where && state.input.where.trim()) {
        parts.push(state.input.where.trim() + (state.input.particle || "で"));
    }
    if (state.input.what && state.input.what.trim()) {
        parts.push(state.input.what.trim());
    }
    
    const originalText = parts.length > 0 ? parts.join("") : "なにかのモヤモヤ";

    // ★ここが超重要
    state.diary.unshift({
        text: result.text,
        original: originalText,
        levelClass: result.levelClass,
        time: new Date().toLocaleDateString(),
        isFavorite: false // ← 必ず false にする
    });

    localStorage.setItem("diary", JSON.stringify(state.diary));
    state.page = "result";
    render();
}

// --------------------
// speech
// --------------------
function initSpeech() {
  const speech = document.getElementById("speech");
  if (!speech) return;

  const guideMessages = [
    // 挨拶系
    "あ、いらっしゃい",
    "モヤモヤしたことなんでも書きなよ。誰も見てないし",
    // 入力のハードルを下げる
    "気が済むまで書いていいし、一行だけでもいいよ", 
    "忘れたとこは、空欄のままでいいから",
    // レベル（スライダー）の説明 ※ここを口語に修正
    "下のバー、右にやるほど訳わかんなくなるよ", 
    "跡形もなくしたいなら、レベルは最大だね",
    // アクション（ボタン）への誘導
    "書き終わったら「ほどく」で合図して"
  ];

  function getContextualMessages() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) {
      return [
        "まだ頭が起きてないから、適当に聞いておくね",
        "朝から考えるとか、偉すぎない？",
        "満員電車とか、あれ人間の乗り物じゃないよね",
        "朝からモヤモヤするの、損な感じするよね"
      ];
    } else if (hour >= 23 || hour < 5) {
      return [
        "……まだ起きてるの。お疲れさま",
        "こんな時間まで、大変だねぇ",
        "深夜のモヤモヤは、毒になりやすいからな～",
        "夜は静かすぎて、ロクなこと考えないよね",
        "ここなら誰にも見つからないし",
        "もう寝なよ、と言いたいけど。書くなら付き合うよ"
      ];
    } else {
      return [
        "モヤモヤ、こっちで預からせてね",
        "モヤモヤって、質量あるのかな…",
        "それ、意外と溜まるやつだよね",
        "外、うるさくない？",
        "人間って、いろいろ溜まるよねぇ",
        "あー、なんか甘いもの食べたい"
      ];
    }
  }

  let guideIndex = 0;
  let contextIndex = 0;
  let isGuideFinished = false;

  function showMessage() {
    let currentMessage = "";

    if (!isGuideFinished) {
      currentMessage = guideMessages[guideIndex];
      guideIndex++;
      if (guideIndex >= guideMessages.length) {
        isGuideFinished = true;
      }
    } else {
      const contextMessages = getContextualMessages();
      currentMessage = contextMessages[contextIndex];
      contextIndex = (contextIndex + 1) % contextMessages.length;
    }

    speech.textContent = currentMessage;
    speech.classList.add("show");

    // 【1. 表示時間】
    // ガイド中は「3秒」、終わったら「5秒（ゆっくり）」にする
    const displayTime = !isGuideFinished ? 3000 : 5000; 

    // 【2. 余白の時間】
    // ガイド中は「0.8秒（ポンポン進む）」、終わったら「4秒（気長に）」にする
    const waitTime = !isGuideFinished ? 800 : 4000;

    setTimeout(() => {
      speech.classList.remove("show");

      // セリフが完全に消えた後、一定時間待ってから次のセリフを予約する
      setTimeout(() => {
        // ガイド中、または80%の確率で次を喋る
        if (!isGuideFinished || Math.random() < 0.8) {
          showMessage();
        } else {
          // 20%の確率で喋らない場合でも、また数秒後に「喋るかどうかの判定」に戻す
          setTimeout(showMessage, 3000);
        }
      }, waitTime);

    }, displayTime);
  }

  // 初回表示（800ms後）
  setTimeout(showMessage, 800);
}

function toggleFav(text) {
    if (state.favorites.includes(text)) {
        state.favorites = state.favorites.filter(f => f !== text);
    } else {
        state.favorites.push(text);
    }
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
    render();
}

function go(page) {
    state.page = page;
    render();
}
// 入力をリセットしてホームに戻る関数
function finishAndHome() {
    // 入力内容を初期値に戻す
    state.input = {
        who: "",
        where: "",
        what: "",
        particle: "で",
        level: "1" // レベルも「ちょっと」に戻す
    };
    
    // ホーム画面へ移動
    go('input');
}

render();