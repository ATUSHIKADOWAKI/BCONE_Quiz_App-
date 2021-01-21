'use strict';

{
  const question = document.getElementById('question');//ID取得
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');
  const explain = document.querySelector('.explain');
  const reference = document.querySelector('.reference');

  //クイズのデータを用意。オブジェクトの配列で持つ
  const quizSet = shuffle([
    {q: '初めてRedBull BC ONEが開催された国は？', c:['スイス','フランス','アメリカ'], e:['世界最高峰ブレイクダンスバトルの大会「RedBull BC ONE」の初開催は2004年スイスのビールにて行われた。この後、数々の歴史を生み出す事になるのである。'],r:['<iframe width="560" height="315" src="https://www.youtube.com/embed/a4z2LM69HzI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},
    {q: 'BC ONE初開催である2004年の優勝者は？', c:['Omar','Ronnie','Hong 10'], e:['世界中のトッププレイヤー16名の中から、見事初代チャンピオンに勝ち抜いたOmar。彼のパワームーブ、フリップ等、ダイナミックなスタイルにも関わらず、決勝でも尚衰えない強靭なスタミナには驚かされる。'],r:['<iframe width="560" height="315" src="https://www.youtube.com/embed/Svz7LE-JDdc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},
    {q: 'BC ONE World Finalが初めて日本で行われたのはいつ？', c:['2010年','2020年','2005年'], e:['2010年11月27日、国立代々木競技場第二体育館にて、「Red Bull BC One Tokyo 2010」が開催された。初の開催地で、日本のB-boyも大興奮。会場には長蛇の列ができた。当年、日本人代表としてTaisuke,Toshikiが出場している。'],r:['<iframe width="560" height="315" src="https://www.youtube.com/embed/ST6KWvePhRU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},
    {q: '2014年開催Red Bull BC One World Finals in Parisにて,フランス代表Lilouが、ロシア代表Alcolilに投げつけたものとは！？', c:['ニット帽','バナナの皮','RedBull'], e:['興奮したLilouが投げつけたのは自身のニット帽。気性の荒い彼の性格には賛否両論の声があるが、今回勝利を手にしたのはロシア代表のAlcolil。'],r:['<iframe width="560" height="315" src="https://www.youtube.com/embed/IzgPV9TpX64" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},
    {q: '2018年WorldFinalにて、B-girl部門のバトルが大会史上初行われた。その時の優勝者は誰？', c:['Ami(Japan)','San Andrea(France)','Kate(Ukraine)'], e:['B-girl部門初開催、世界一を勝ち抜いたのは日本代表のAmi。彼女のフットーワーク、パワームーブ等、あらゆるテクニックを交えた決勝での完璧なムーブはB-boy達の度肝を抜くだろう。B-girl部門の誕生により、今後より一層シーンが盛り上がる事間違いなし。'],r:['<iframe width="560" height="315" src="https://www.youtube.com/embed/GmoCdid5P2E" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},
    {q: '2014年WorldFinal.フランス代表Mounirが、対戦相手であるアメリカ代表Gravityに行った行動とは？', c:['挑発的なTシャツを用意して、会場に見せつけた','永遠に続く、熱烈なハグ','ズボンを脱がせようとした'], e:['おもむろにTシャツを脱ぎ始め、下に着ていた「Gravity×」というRUN DMCのロゴをパロディ化したかの様なTシャツを、会場に見せつけた。わざわざTシャツを作って仕込んでくる彼の行動には、もはや挑発を超え、相手へのリスペクトにも感じてくる。しかし、彼の努力も報われず、このバトルの勝者はGravity。'],r:['<iframe width="560" height="315" src="https://www.youtube.com/embed/pe7AcaNbW88" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>']},
    
  ]);

  let currentNum = 0;//今何番目の問題か
  let isAnswered;
  let score = 0; //スコアを表示するための変数
  
  function shuffle(arr){//選択肢をシャッフル
    for(let i = arr.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));//ランダムに選ぶ。0~i番目のランダムな整数値を作る。
    [arr[j],arr[i]] = [arr[i],arr[j]];//分割代入。iとjを入れ替える。
    }
    return arr;
  }

  function checkAnswer(li){//正誤判定
    // if(isAnswered === true){
    if(isAnswered){
      return;
    }
    isAnswered = true;

    if(li.textContent === quizSet[currentNum].c[0]){
      li.classList.add('correct');//correctクラスをつける
      score++;//正解したらスコアをプラス
    }else{
      li.classList.add('wrong');//wrongクラスをつける（cssを作る）
    }

  }

  function setQuiz(){//クイズをセットする関数
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild){//nullになるまで繰り返してくれる。
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c])
    // console.log(quizSet[currentNum].c);
    shuffledChoices.forEach(choice =>{//quizSet[0]のcにforEachで、それぞれ以下の処理
      const li = document.createElement('li');//li要素を作る。
      li.textContent = choice;//配列の一つ一つの要素であるchoiceをテキストで代入。
      li.addEventListener('click',()=>{
        checkAnswer(li);
        scoreLabel.textContent = `正解は:${quizSet[currentNum].c[0]}`;
        explain.textContent = `${quizSet[currentNum].e[0]}`;
        reference.innerHTML = `${quizSet[currentNum].r[0]}`;
        result.classList.remove('hidden');
      });
      choices.appendChild(li);//liをulの「id=choices」に追加していく。
    });
    
  }
 
      setQuiz();

}
