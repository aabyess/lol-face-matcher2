import React, { useState } from 'react';
import { Upload, message, Typography, Button, Card, Tag, Space, Row, Col } from 'antd';
import { InboxOutlined, ReloadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { motion, AnimatePresence } from 'framer-motion';
import championMeta from './champion_meta.json';

const { Dragger } = Upload;
const { Title, Text } = Typography;

const App = () => {
  const [genderLabel, setGenderLabel] = useState('알 수 없음');
  const [result, setResult] = useState(null);
  const [mainIndex, setMainIndex] = useState(0);

  const uploadProps = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:8000/upload',
    showUploadList: false,
    onChange(info) {
      const { status, response } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} 업로드 성공!`);
        if (response?.top_matches) {
          setResult(response);
          setMainIndex(0);
          const g = response.gender?.toLowerCase();
          setGenderLabel(g === 'man' ? '남자' : g === 'woman' ? '여자' : '알 수 없음');
        } else {
          message.warning('얼굴을 찾을 수 없습니다.');
          setResult(null);
        }
      } else if (status === 'error') {
        message.error(`${info.file.name} 업로드 실패.`);
        setResult(null);
      }
    },
  };

  const resetResult = () => {
    setResult(null);
    setMainIndex(0);
  };

  const renderMainCard = (champ) => {
    const champName = champ.name.replace('.png', '');
    const meta = championMeta[champName] || {};
    return (
      <motion.div
        key={champ.name}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Card
          hoverable
          style={{
            width: '100%',
            maxWidth: 450,
            margin: '0 auto 30px',
            backgroundColor: 'rgba(30, 42, 56, 0.85)',
            color: '#ffffff',
            border: '1px solid #2e4a68',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5)',
          }}
          cover={
            <img
              alt={champName}
              src={`/champions/${champ.name}`}
              style={{ objectFit: 'cover', height: '320px', width: '100%' }}
            />
          }
        >
          <Title level={2} style={{ color: '#ffffff' }}>{champName}</Title>
          <Text style={{ color: '#d0d8e0' }}><strong>매칭률:</strong> {(champ.score * 100).toFixed(2)}%</Text><br />
          <Text style={{ color: '#d0d8e0' }}><strong>역할:</strong> {meta.role || '알 수 없음'}</Text><br />
          <Text style={{ color: '#d0d8e0' }}><strong>포지션:</strong> {(meta.position || ['알 수 없음']).join(', ')}</Text><br />
          <Text style={{ color: '#d0d8e0' }}><strong>태그:</strong> <Space>{(meta.tags || []).map(t => <Tag key={t} color="#3a66a5">{t}</Tag>)}</Space></Text><br /><br />
          <Text italic strong style={{ fontSize: '16px', color: '#ffffff' }}>
            "{meta.quote || '정보 없음'}"
          </Text>
        </Card>
      </motion.div>
    );
  };

  const renderSubCards = () => (
    <Row gutter={[12, 12]} justify="center" style={{ padding: '10px 0' }}>
      {result.top_matches.slice(0, 6).map((champ, idx) => (
        <Col xs={12} sm={8} md={4} key={champ.name}>
          <Card
            hoverable
            onClick={() => setMainIndex(idx)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(38, 53, 72, 0.85)',
              color: '#ffffff',
              border: mainIndex === idx ? '2px solid #1890ff' : '1px solid #2e4a68',
            }}
            cover={<img alt={champ.name} src={`/champions/${champ.name}`} style={{ objectFit: 'cover', height: '120px' }} />}
          >
            <Text style={{ color: '#ffffff' }}><strong>{champ.name.replace('.png', '')}</strong></Text><br />
            <Text style={{ color: '#d0d8e0' }}>{(champ.score * 100).toFixed(1)}%</Text>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center center',
          zIndex: -2,
        }}
      >
        <source src="/assets/mainPage3.webm" type="video/webm" />
      </video>

      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', color: 'white', marginBottom: '16px' }}>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold' }}>MatchMyChampion</h1>
          <p style={{ margin: 0, fontSize: '18px' }}>Who Is Your Champ?</p>
        </div>

        <div style={{ width: '100%', maxWidth: '900px', padding: '24px', backgroundColor: 'rgba(30, 42, 56, 0.85)', borderRadius: '16px', boxShadow: '0 6px 16px rgba(0,0,0,0.5)', border: '1px solid #2e4a68' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <Title level={2} style={{ color: 'white', fontSize: '24px' }}>리그 챔피언 닮은꼴 찾기</Title>
            {result && <Text style={{ fontSize: '14px', color: '#d0d8e0' }}>감지된 성별: {genderLabel}</Text>}
          </div>

          {!result ? (
            <Dragger {...uploadProps} className="upload-box">
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: '48px', color: '#40a9ff' }} />
              </p>
              <p style={{ color: 'white' }}>사진 파일을 여기에 드래그하거나 클릭하세요</p>
              <p style={{ color: 'white' }}>JPG, PNG 등 이미지 파일만 업로드 가능합니다.</p>
            </Dragger>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {renderMainCard(result.top_matches[mainIndex])}
              </AnimatePresence>
              {renderSubCards()}
              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Button type="primary" icon={<ReloadOutlined />} onClick={resetResult}>
                  다시 테스트 하기
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;