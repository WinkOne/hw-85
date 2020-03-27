const mongoose = require('mongoose');
const config = require("./config");
const nanoid = require('nanoid');

const Artist = require('./model/Artist');
const Album = require('./model/Album');
const Track = require('./model/Track');
const User = require('./model/User');

const run = async () => {
    await mongoose.connect(config.database, config.databaseOptions);

    const collection = await mongoose.connection.db.listCollections().toArray();

    for (let coll of collection) {
        await mongoose.connection.db.dropCollection(coll.name);
    }
    await User.create({
        username: 'User',
        password: '123',
        avatar: 'fixtures/кот.jpg',
        token: nanoid()
    }, {
        username: 'Admin',
        password: '123',
        avatar: 'fixtures/зипуля.jpeg',
        role: 'admin',
        token: nanoid()

    });

    const [pharaon, tFest, victorTsoi] = await Artist.create({
        nameArtist: 'PHARAOH',
        imageArtist: 'fixtures/faraon.jpg',
        infoArtist: 'Pharaoh — российский хип-хоп-исполнитель. Бывший участник Grindhouse и YungRussia, ныне — лидер творческого объединения Dead Dynasty. Творческое объединение Dead Dynasty, в котором состоит Pharaoh, являлось участником движения YungRussia, созданного музыкантом из Уфы Boulevard Depo.'
    }, {
        nameArtist: 'T-Fest',
        imageArtist: 'fixtures/tfest.jpg',
        infoArtist: 'Кирилл Игоревич Незборецкий; — украинский рэпер, автор песен более известен как T-Fest участник творческого объединения Gazgolder.'
    }, {
        nameArtist: 'Victor Tsoi',
        imageArtist: 'fixtures/цой.webp',
        infoArtist: 'Ви́ктор Ро́бертович Цой — советский рок-музыкант, автор песен и художник. Основатель и лидер рок-группы «Кино», в которой пел, играл на гитаре и являлся автором песен. Кроме этого, снялся также в нескольких фильмах. Лучший актёр 1989 года по версии журнала «Советский экран»'
    });
    const [phuneral, dolor, youth97, album0372, acousticConcert, bloodType] = await Album.create({
        titleAlbum: 'Phuneral',
        executor: pharaon,
        yearOfIssueAlbum: '2018',
        description: 'Phuneral — седьмой микстейп российского хип-хоп-исполнителя Pharaoh, выпущенный 24 августа 2018 года на лейбле SELF-ISSUED. В поддержку альбома был выпущен сингл «Smart» 8 августа 2018 года. В микстейпе приняли участие группа «Рубль», Сергей Шнуров, Big Baby Tape и Noa.',
        imageCover: 'fixtures/фараонобложка.jpg'
    }, {
        titleAlbum: 'Dolor',
        executor: pharaon,
        yearOfIssueAlbum: '2015',
        description: '',
        imageCover: 'fixtures/fo.jpeg'
    }, {
        titleAlbum: 'Youth 97',
        executor: tFest,
        yearOfIssueAlbum: '2017',
        description: '',
        imageCover: 'fixtures/tfestAlbum.jpeg'
    }, {
        titleAlbum: 'Album 0372',
        executor: tFest,
        yearOfIssueAlbum: '2017',
        description: '',
        imageCover: 'fixtures/tfestAlbum2.jpg'
    }, {
        titleAlbum: 'Acoustic concert',
        executor: victorTsoi,
        yearOfIssueAlbum: '1994',
        description: 'Звукозаписывающая компания: Moroz Records',
        imageCover: 'fixtures/цойалбом.jpeg'
    }, {
        titleAlbum: 'Blood type',
        executor: victorTsoi,
        yearOfIssueAlbum: '1988',
        description: '«Гру́ппа кро́ви» — шестой студийный альбом советской рок-группы «Кино». Выпущенный в 1988 году, альбом получил широкую известность как в Советском Союзе, так и за рубежом. Выход альбома принёс группе быстрый рост популярности, частые приглашения из разных стран и огромное число поклонников.',
        imageCover: 'fixtures/цойалбом2.jpg'
    });

    await Track.create({
        titleTrack: 'Лантана',
        album: phuneral,
        duration: '1:58',
        number: 1
    }, {
        titleTrack: '1996',
        album: phuneral,
        duration: '2:40',
        number: 2
    }, {
        titleTrack: 'Солярис',
        album: phuneral,
        duration: '3:03',
        number: 3
    }, {
        titleTrack: 'Смарт',
        album: phuneral,
        duration: '2:28',
        number: 4
    }, {
        titleTrack: 'Дефект',
        album: phuneral,
        duration: '2:33',
        number: 5
    }, {
        titleTrack: 'Новая эра',
        album: dolor,
        duration: '3:23',
        number: 1
    }, {
        titleTrack: 'На твоём теле',
        album: dolor,
        duration: '3:00',
        number: 2
    }, {
        titleTrack: 'В ванной',
        album: dolor,
        duration: '3:10',
        number: 3
    }, {
        titleTrack: 'Пекло',
        album: dolor,
        duration: '3:08',
        number: 4
    }, {
        titleTrack: 'Передай привет',
        album: dolor,
        duration: '2:37',
        number: 5
    }, {
        titleTrack: 'Луна',
        album: youth97,
        duration: '3:21',
        number: 1
    }, {
        titleTrack: 'Не для меня',
        album: youth97,
        duration: '3:28',
        number: 2
    }, {
        titleTrack: 'Хайп',
        album: youth97,
        duration: '3:26',
        number: 3
    }, {
        titleTrack: 'Цвети',
        album: youth97,
        duration: '3:29',
        number: 4
    }, {
        titleTrack: 'Грязь',
        album: youth97,
        duration: '3:10',
        number: 5
    }, {
        titleTrack: 'Скит',
        album: album0372,
        duration: '1:19',
        number: 1
    }, {
        titleTrack: 'Йоу-Йоу, нету',
        album: album0372,
        duration: '3:44',
        number: 2
    }, {
        titleTrack: 'Время играть',
        album: album0372,
        duration: '3:14',
        number: 3
    }, {
        titleTrack: 'Мимо домов',
        album: album0372,
        duration: '3:19',
        number: 4
    }, {
        titleTrack: 'Интро',
        album: album0372,
        duration: '1:03',
        number: 5
    }, {
        titleTrack: 'Камчатка',
        album: acousticConcert,
        duration: '2:55',
        number: 1
    }, {
        titleTrack: 'Ухои',
        album: acousticConcert,
        duration: '3:16',
        number: 2
    }, {
        titleTrack: 'Хочу перемен',
        album: acousticConcert,
        duration: '4:05',
        number: 3
    }, {
        titleTrack: 'Каждую ночь',
        album: acousticConcert,
        duration: '2:45',
        number: 4
    }, {
        titleTrack: 'Последний герой',
        album: acousticConcert,
        duration: '4:16',
        number: 5
    }, {
        titleTrack: 'В наших глазах',
        album: bloodType,
        duration: '4:23',
        number: 1
    }, {
        titleTrack: 'Спокойная ночь',
        album: bloodType,
        duration: '3:54',
        number: 2
    }, {
        titleTrack: 'Война',
        album: bloodType,
        duration: '3:41',
        number: 3
    }, {
        titleTrack: 'Закрой за мной дверь',
        album: bloodType,
        duration: '4:01',
        number: 4
    }, {
        titleTrack: 'Группа крови',
        album: bloodType,
        duration: '3:25',
        number: 5
    }, {
        titleTrack: 'Группа',
        album: bloodType,
        duration: '3:25',
        number: 6
    });
    mongoose.connection.close();
};

run().catch(e => {
    throw e;
});